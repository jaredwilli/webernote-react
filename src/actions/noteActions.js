import { database } from '../data/firebase.js';
import * as types from '../constants/actionTypes.js';

import { uniq, guid } from '../common/helpers.js';

export function getState() {
	return (dispatch, getState) => {
		return getState();
	};
}

export function getNotes() {
	return dispatch => {
		dispatch(getNotesRequestedAction());

		return database
			.ref('/notes')
			.once('value', snap => {
				const notes = snap.val();

				dispatch(getNotesFulfilledAction(notes));
			})
			.catch(error => {
				console.error(error);
				dispatch(getNotesRejectedAction());
			});
	};
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
	return dispatch => {
		dispatch(addNoteRequestedAction());

		const notesRef = database.ref('/notes');
		const noteRef = notesRef.push();

		// Add a unique ID and ref ID to note object
		note.uid = guid();
		note.id = noteRef.key;

		// Push note data
		noteRef.set(note);

		dispatch(addNoteFulfilledAction(note));
	};
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
		database
			.ref('/notes/' + note.id)
			.update(note)
			.then(dispatch(editNoteFulfilledAction(note, {})))
			.catch(error => {
				console.error(error);
				dispatch(editNoteRejectedAction());
			});
	};
}

/**
 * editNoteNotebook
 * 
 * @param {Object} note 
 * @param {Object} notebook 
 */
export function editNoteNotebook(note, notebook) {
	return dispatch => {
		dispatch(editNoteRequestedAction());

		if (!note) {
			dispatch(editNoteRejectedAction());
		}

		/* If notebook not null and value has changed update the notes notebook only */
		if (notebook && notebook.name !== note.notebook) {
			// update the notebook of the note
			let notebookRef = database.ref('/notes/' + note.id + '/notebook/');

			notebookRef
				.set(notebook.name)
				.then(dispatch(editNoteFulfilledAction(note)))
				.catch(error => {
					console.error(error);
					dispatch(editNoteRejectedAction());
				});
		}
	};
}

/**
 * editNoteTags
 * 
 * @param {*} note 
 * @param {*} allNoteTags 
 */
export function editNoteTags(note, tags) {
	return dispatch => {
        dispatch(editNoteRequestedAction());
        
        const noteRef = database.ref('/notes/' + note.id);
        
        noteRef.child('tags').once('child_added', (snap) => {
            if (snap.exists()) {
                // Tag was added so get note snap     
                noteRef.once('value')
                    .then((snap) => {
                        dispatch(editNoteFulfilledAction(note));
                    });
            }
        });
        // noteRef.on('child_added', (snap, prevChild) => {
        //     if (snap.ref.key) {

        //     }
        // });
        
        // noteRef.on('child_removed', (childSnap) => {
        //     console.log('====================================');
        //     console.log(childSnap.key);
        //     console.log('====================================');    
        // });
        
		// noteRef.child('tags').on('child_added')
		// 	.then(snap => {
		// 		console.log(snap.exists());
		// 		debugger;
		// 	});
	};
}

export function deleteNote(id) {
	return dispatch => {
		dispatch(deleteNoteRequestedAction());

		const noteRef = database.ref('/notes/' + id);

		noteRef.remove();

		dispatch(deleteNoteFulfilledAction(id));
	};
}

export function selectNote(note) {
	return (dispatch, getState) => {
		dispatch(selectNoteRequestedAction());

		const notesRef = database.ref('/notes/');
		const currentNotes = getState().noteData.notes;

		note = currentNotes.filter(function(n) {
			return n.id === note.id;
		})[0];

		notesRef
			.child(note.id + '/isEditing/')
			.set(true)
			.then(dispatch(selectNoteFulfilledAction(note)))
			.catch(error => {
				console.error(error);
				dispatch(selectNoteRejectedAction());
			});
	};
}

export function resetSelectedNote() {
	return (dispatch, getState) => {
		dispatch(resetSelectedNoteRequestedAction());
		const notes = getState().noteData.notes;

		const note = notes.forEach(n => {
			if (n.isEditing) {
				database
					.ref('/notes/' + n.id + '/isEditing/')
					.set(false)
					.then(dispatch(resetSelectedNoteFulfilledAction(n)))
					.catch(error => {
						console.error(error);
						dispatch(resetSelectedNoteRejectedAction());
					});
			}
		});
	};
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

function editNoteFulfilledAction(note) {
	return { type: types.EditNoteFulfilled, note };
}
/**
 * Delete 
 * Note
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
