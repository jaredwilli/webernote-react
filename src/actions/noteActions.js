// Facebook URI redirect for authentication
// https://webernote-7f700.firebaseapp.com/__/auth/handler

import { database } from '../data/firebase.js';

import { createNewNote, getDeletedTags } from '../common/noteHelpers.js';
import { uniq } from '../common/helpers.js';

import * as types from '../constants/actionTypes.js';

export function getState() {
    return (dispatch, getState) => {
        return getState();
    }
}

export function getNotes() {
    return dispatch => {
        dispatch(getNotesRequestedAction());

        return database.ref('/notes').once('value', (snap) => {
            const notes = snap.val();
            dispatch(getNotesFulfilledAction(notes));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getNotesRejectedAction());
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
                const removedTags = getDeletedTags(obj.tags, note);
                
                if (removedTags.length) {
                    removedTags.forEach((tag) => {
                        noteTagsRef.child(tag.id).remove();
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
                            let noteTagRef = noteRef.child('/tags/' + tag.id)
                            // Update the tag by ID
                            noteTagRef.update(tag);
                        } else {
                            // if no ID push a new tag to the list
                            let tagsRef = noteRef.child('/tags/').push();
                            
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

export function deleteNote(id) {
    return dispatch => {
        dispatch(deleteNoteRequestedAction());

        database.ref('/notes/' + id)
            .remove()
            .then(function() {
                dispatch(deleteNoteFulfilledAction())
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteNoteRejectedAction());
            });
    }
}

export function selectNote(note) {
    return (dispatch, getState) => {
        dispatch(selectNoteRequestedAction());
        const currentNotes = getState().noteData.notes;

        note = currentNotes.filter(function(n) {
            return n.id === note.id;
        })[0];

        database.ref('/notes/' + note.id + '/isEditing/')
            .set(true)
            .then(dispatch(selectNoteFulfilledAction(note)))
            .catch((error) => {
                console.error(error);
                dispatch(selectNoteRejectedAction());
            });
    }
}

export function resetSelectedNote() {
    return (dispatch, getState) => {
        dispatch(resetSelectedNoteRequestedAction());
        
        const notes = getState().noteData.notes;

        notes.forEach((n) => {
            if (n.isEditing) {
                database.ref('/notes/' + n.id + '/isEditing/')
                    .set(false)
                    .then(dispatch(resetSelectedNoteFulfilledAction(n)))
                    .catch((error) => {
                        console.error(error);
                        dispatch(resetSelectedNoteRejectedAction());
                    });
            }
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
    return { type: types.DeleteNoteFulfilled };
}

function deleteNoteRejectedAction() {
    return { type: types.DeleteNoteRejected };
}

function deleteNoteFulfilledAction() {
    return { type: types.DeleteNoteFulfilled };
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
