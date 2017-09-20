import { database } from '../data/firebase.js';
import * as types from '../constants/actionTypes.js';

import { uniq, guid } from '../common/helpers.js';

export function getState() {
    return (dispatch, getState) => {
        return getState();
    }
}

export function getNotes() {
    return dispatch => {
        dispatch(getNotesRequestedAction());

        return database.ref('/notes').once('value', snap => {
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
}
 */
export function addNote(note) {
    return (dispatch) => {
        dispatch(addNoteRequestedAction());
        
        const notesRef = database.ref('/notes');        
        const noteRef = notesRef.push();

        // Add a unique ID and ref ID to note object
        note.uid = guid();
        note.id = noteRef.key

        // Push note data
        noteRef.set(note);
        
        dispatch(addNoteFulfilledAction(note));
    }
}

/**
 * editNote
 * 
 * @param {*} note 
 */
export function editNote(note) {
    return (dispatch, getState) => {
        dispatch(editNoteRequestedAction());

        if (!note) {
            dispatch(editNoteRejectedAction());
        }

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

/**
 * editNoteNotebook
 * 
 * @param {Object} note 
 * @param {Object} notebook 
 */
export function editNoteNotebook(note, notebook) {
    return (dispatch) => {
        dispatch(editNoteNotebookRequestedAction());

        if (!note) {
            dispatch(editNoteNotebookRejectedAction());
        }

        /* If notebook not null and value has changed update the notes notebook only */
        if (notebook && notebook.name !== note.notebook) {
            // update the notebook of the note
            let notebookRef = database.ref('/notes/' + note.id + '/notebook/');
            
            notebookRef.set(notebook.name)
                .then(dispatch(editNoteNotebookFulfilledAction(note, notebook)))
                .catch((error) => {
                    console.error(error);
                    dispatch(editNoteNotebookRejectedAction());
                });
        }
    }
}

export function editNoteTags(note, allNoteTags) {
    return (dispatch) => {
        const noteTagsRef = database.ref('/notes/' + note.id + '/tags/');
        const tagsRef = database.ref('/tags/');
        
        dispatch(editNoteTagsRequestedAction());

        if (!note) {
            dispatch(editNoteTagsRejectedAction());
        }
        
        // Remove all Note Tags
        if (!allNoteTags) {
            noteTagsRef.remove();

            dispatch(editNoteTagsFulfilledAction(note));
        }
        
        let newTag = '';
        // Its a problem to have the tag added to /tags and note/tags with no way to associate them together
        tagsRef.on('child_added', (snap) => {
            newTag = snap.val();
        });

        // Make tag list unique
		allNoteTags = uniq(allNoteTags);
        
        noteTagsRef.once('value', snap => {
			let remoteNoteTags = snap.val();
			// console.log(remoteNoteTags);

			// Only add new tags but make full tagList
			allNoteTags.forEach((tag) => {
				// console.log(!remoteNoteTags || remoteNoteTags.hasOwnProperty(tag.label));

                // Add the new tag
				if (!remoteNoteTags || !remoteNoteTags.hasOwnProperty(tag.label)) {
					const noteTagRef = noteTagsRef.push();

					tag.id = noteTagRef.key;
                    tag.value = noteTagRef.key;
                    
					noteTagRef.set(tag);
				}
            });
        });

        let noteTag = '';
        noteTagsRef.on('child_added', (snap) => {
            noteTag = snap.val();
            
            debugger
            dispatch(editNoteTagsFulfilledAction(note, noteTag));
        });

        // if tags is empty then REMOVE them from note
        // // if (!tags.length) {
        // //     const noteRef = database.ref('/notes/' + note.id);

        // //     noteRef.child('/tags/').remove()
        // //         .then(dispatch(editNoteTagsFulfilledAction(note)))
        // //         .catch((error) => {
        // //             console.error(error);
        // //             dispatch(editNoteTagsRejectedAction());
        // //         });
        // // } else {
        // //     const noteRef = database.ref('/notes/' + note.id);
        // //     let tagList = [];

        // //     // Make tag list unique
        // //     tags = uniq(tags);
            
        // //     // Update existing tags and add new ones
        // //     noteRef.child('/tags/').once('value', (snap) => {
        // //         let noteTags = snap.val();
        // //         // console.log(noteTags);

        // //         tags.forEach((tag) => {
        // //             // if tag has an ID update that ref
        // //             if (tag.id) {
        // //                 if (noteTags && noteTags.hasOwnProperty(tag.id)) {
        // //                     tagList.push(tag);
        // //                 } else {
        // //                     noteRef.child('/tags/' + tag.id)
        // //                     .update(tag);
                            
        // //                     // Push to tagList
        // //                     tagList.push(tag);
        // //                 }
        // //             } else if (!tag.id) {
        // //                 if (!noteTags.hasOwnProperty(tag.id)) {
        // //                     // if no ID push a new tag to the list
        // //                     let tagsRef = noteRef.child('/tags/').push();
                            
        // //                     tag.id = tagsRef.key;
        // //                     tag.value = tagsRef.key;
        // //                     tagsRef.set(tag);
                            
        // //                     // push each tag to tagList to update state
        // //                     tagList.push({
        // //                         id: tagsRef.key,
        // //                         value: tagsRef.key,
        // //                         label: tag.label
        // //                     });
        // //                 }
        // //             }
        // //         });
        // //         dispatch(editNoteTagsFulfilledAction(note, tagList));
        // //     });

        // }
    }
}

export function deleteNote(id) {
    return dispatch => {
        dispatch(deleteNoteRequestedAction());

        const noteRef = database.ref('/notes/' + id);
        
        noteRef.remove();

        dispatch(deleteNoteFulfilledAction(id));
    }
}

export function selectNote(note) {
    return (dispatch, getState) => {
        dispatch(selectNoteRequestedAction());
        
        const notesRef = database.ref('/notes/');
        const currentNotes = getState().noteData.notes;

        note = currentNotes.filter(function(n) {
            return n.id === note.id;
        })[0];

        notesRef.child(note.id + '/isEditing/')
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

        const note = notes.forEach((n) => {
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
 * Get Note
 */
/* function getNoteRequestedAction() {
    return { type: types.GetNoteRequested };
}

function getNoteRejectedAction() {
    return { type: types.GetNoteRejected };
}

function getNoteFulfilledAction(note) {
    return { type: types.GetNoteFulfilled, note };
} */

/**
 * Add Note
 */
function addNoteRequestedAction() {
    return { type: types.AddNoteRequested };
}

function addNoteRejectedAction() {
    return { type: types.AddNoteRejected };
}

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
 * Edit Note Notebook
 */
function editNoteNotebookRequestedAction() {
    return { type: types.EditNoteNotebookRequested };
}

function editNoteNotebookRejectedAction() {
    return { type: types.EditNoteNotebookRejected };
}

function editNoteNotebookFulfilledAction(note, notebook) {
    return { type: types.EditNoteNotebookFulfilled, note, notebook };
}

/**
 * Edit Note Tags
 */
function editNoteTagsRequestedAction() {
    return { type: types.EditNoteTagsRequested };
}

function editNoteTagsRejectedAction() {
    return { type: types.EditNoteTagsRejected };
}

function editNoteTagsFulfilledAction(note, tagList) {
    return { type: types.EditNoteTagsFulfilled, note, tagList };
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

function deleteNoteFulfilledAction(noteId) {
    return { type: types.DeleteNoteFulfilled, noteId };
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
