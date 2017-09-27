import { database } from '../data/firebase.js';
import * as types from '../constants/actionTypes.js';

import { 
    createNewNote, 
    getNotebookCount, 
    getTagCount, 
    getDeletedNoteTags 
} from '../common/noteHelpers.js';

import { uniq } from '../common/helpers.js';
import { DEFAULTS, FILTER_TYPES } from '../constants/noteConst';

export function getState() {
    return (dispatch, getState) => {
        return getState();
    }
}

export function getNotes(filters) {
    return (dispatch, getState) => {
        dispatch(getNotesRequestedAction());

        console.log(filters);
        const notesRef = database.ref('notes');

        // Get all notes
        notesRef.once('value', (snap) => {
            const notes = snap.val();
    
            // Return all notes unfiltered
            if (!filters) {
                dispatch(getNotesFulfilledAction(notes));
            } else {
                let filtersToApply = Object.assign({});
                
                filtersToApply = Object.keys(filters).forEach((f) => {
                    return filters[f];
                });

                console.log(filtersToApply);
debugger

                return false;
            }
        });
    }
}

/* export function getNote(id) {
    return (dispatch, getState) => {
        dispatch(getNoteRequestedAction());
        
        // Filter notes by ID to get note
        const note = getState().noteData.notes.filter(function(n) {
            return n.id === id;
        })[0];
        
        if (!note) {
            dispatch(getNoteRejectedAction());
        }
        
        dispatch(getNoteFulfilledAction(note));
    }
}*/

export function addNote(note) {
    return (dispatch) => {
        dispatch(addNoteRequestedAction());

        const notesRef = database.ref('notes');

        let noteRef = notesRef.push();
        note = createNewNote(noteRef.key);

        noteRef.set(note);
        dispatch(addNoteFulfilledAction(note));
    }
}

export function editNote(note, obj = null) {
    return (dispatch, getState) => {
        dispatch(editNoteRequestedAction());

        // refs
        const noteRef = database.ref('notes/' + note.id);
        
        if (!note) {
            dispatch(editNoteRejectedAction());
            return;
        }
        
        if (obj) {
            /* If notebook not null and value has changed update the notes notebook only */
            if (obj.notebook && obj.notebook.name !== note.notebook.name) {
                const noteNotebookRef = noteRef.child('notebook');

                // If has uid and userId
                noteNotebookRef.set(obj.notebook)
                    .then(dispatch(editNoteFulfilledAction(note, obj)))
                    .catch((error) => {
                        console.error(error);
                        dispatch(editNoteRejectedAction());
                    });
            }
            
            /* Handle when tags are defined */
            else if (obj.hasOwnProperty('tags')) {
                const noteTagsRef = noteRef.child('tags');
                
                // Remove all tags removed from edit input
                const removedTags = getDeletedNoteTags(obj.tags, note);
                
                if (removedTags.length) {
                    removedTags.forEach((tag) => {
                        noteTagsRef.child(tag.id)
                            .remove();
                    });
                }

                // If tags is empty then remove them from note
                if (!obj.tags) {
                    noteTagsRef.remove();
                    dispatch(editNoteFulfilledAction(note, { 
                        tags: [] 
                    }));
                } 
                
                // Note has tags
                else {
                    // Make tag list unique
                    obj.tags = uniq(obj.tags);
                    obj.tagList = [];
                    
                    // Update existing tags and add new ones
                    obj.tags.forEach((tag) => {
                        // if tag has an ID update that ref
                        if (tag.id) {
                            let noteTagRef = noteRef.child('tags/' + tag.id)
                            // Update the tag by ID
                            noteTagRef.update(tag);
                        } else {
                            // if no ID push a new tag to the list
                            let tagsRef = noteRef.child('tags').push();
                            
                            // Add extra things to the tag for the note
                            tag.id = tagsRef.key;
                            tag.value = tagsRef.key;
                            tagsRef.set(tag);
                        }
                    });

                    dispatch(editNoteFulfilledAction(note, obj));
                }
            }
        } else {
            // Update the rest of the note data if not editing notebook
            database.ref('/notes/' + note.id)
                .update(note)
                .then(dispatch(editNoteFulfilledAction(note, {})))
                .catch((error) => {
                    console.error(error);
                    dispatch(editNoteRejectedAction());
                });
        }
    }
}

export function deleteNote(note) {
    return (dispatch, getState) => {
        dispatch(deleteNoteRequestedAction());
        
        const notesRef = database.ref('notes');
        const notebooksRef = database.ref('notebooks');
        const tagsRef = database.ref('tags');
        
        const notes = getState().noteData.notes;

        // Check if the note notebook needs to be removed from notebooks
        let notebookCount = getNotebookCount(note.notebook, notes);
 
        // Remove empty notebooks
        if (notebookCount.count <= 1) {
            let notebookRef = notebooksRef.child(notebookCount.notebook.id);
            // remove notebook
            notebookRef.remove()
            dispatch(deleteNoteFulfilledAction(note, notes));
        }

        // Check if the notes tags need to be removed from tags
        if (note.tags.length) {
            note.tags.forEach((t) => {
                let tagCount = getTagCount(t, notes);
                
                // Remove empty tags
                if (tagCount.count <= 1 && tagCount.tag.name !== DEFAULTS.TAG) {
                    let tagRef = tagsRef.child(tagCount.tag.id);
                    // remove tag
                    tagRef.remove()

                    dispatch(deleteNoteFulfilledAction(note, notes));
                }
            });
        }

        // Finally delete the note itself
        notesRef.child(note.id)
            .remove();

        dispatch(deleteNoteFulfilledAction(note, notes));
    }
}

export function selectNote(note) {
    return dispatch => {
        dispatch(selectNoteRequestedAction());

        const noteRef = database.ref('notes/' + note.id);

        noteRef.child('isEditing')
            .set(true)
        
        dispatch(selectNoteFulfilledAction(note));
    }
}

export function resetSelectedNote() {
    return (dispatch, getState) => {
        dispatch(resetSelectedNoteRequestedAction());
        
        const notesRef = database.ref('notes');
        const notes = getState().noteData.notes;
        
        notes.forEach((n) => {
            let noteRef = notesRef.child(n.id);
            
            if (n.isEditing) {
                noteRef.child('isEditing')
                    .set(false)
                
                dispatch(resetSelectedNoteFulfilledAction(n));
            }
231
        });
    }
}

/**
 * Get Notes
 */
function getNotesRequestedAction() {
    return { type: types.GetNotesRequested };
}

function getNotesRejectedAction() {
    return { type: types.GetNotesRejected };
}

function getNotesFulfilledAction(notes) {
    return { type: types.GetNotesFulfilled, notes };
}

/**
 * Add Note
 */
function addNoteRequestedAction() {
    return { type: types.AddNoteRequested };
}

/* function addNoteRejectedAction() {
    return { type: types.AddNoteRejected };
} */

function addNoteFulfilledAction(note) {
    return { type: types.AddNoteFulfilled, note };
}

/**
 * Edit Note
 */
function editNoteRequestedAction() {
    return { type: types.EditNoteRequested };
}

function editNoteRejectedAction() {
    return { type: types.EditNoteRejected };
}

function editNoteFulfilledAction(note, obj) {
    return { type: types.EditNoteFulfilled, note, obj };
}

/**
 * Delete Note
 */
function deleteNoteRequestedAction() {
    return { type: types.DeleteNoteRequested };
}

function deleteNoteRejectedAction() {
    return { type: types.DeleteNoteRejected };
}

function deleteNoteFulfilledAction(note, notes) {
    return { type: types.DeleteNoteFulfilled, note, notes };
}

/**
 * Select Note
 */
function selectNoteRequestedAction() {
    return { type: types.SelectNoteRequested };
}

function selectNoteRejectedAction() {
    return { type: types.SelectNoteRejected };
}

function selectNoteFulfilledAction(note) {
    return { type: types.SelectNoteFulfilled, note };
}

/**
 * Reset Selected Notes
 */
function resetSelectedNoteRequestedAction() {
    return { type: types.ResetSelectedNoteRequested };
}

function resetSelectedNoteRejectedAction() {
    return { type: types.ResetSelectedNoteRejected };
}

function resetSelectedNoteFulfilledAction(note) {
    return { type: types.ResetSelectedNoteFulfilled, note };
}
