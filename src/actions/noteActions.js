import { database } from '../_data/firebase.js';
import * as types from '../constants/actionTypes.js';

import { createNewNote, getDeletedTags } from '../common/noteHelpers.js';
import { uniq } from '../common/helpers.js';

export function getNotes() {
	return (dispatch, getState) => {
		dispatch(getNotesRequestedAction());

        const user = getState().userData.user;
        const notesRef = database.ref('users/' + user.uid + '/notes');

		notesRef.once('value', (snap) => {
            const notes = snap.val();
            dispatch(getNotesFulfilledAction(notes));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getNotesRejectedAction());
        });
	};
}

export function addNote() {
	return (dispatch, getState) => {
		dispatch(addNoteRequestedAction());

        const user = getState().userData.user;
        const notesRef = database.ref('users/' + user.uid + '/notes');
		const noteRef = notesRef.push();

		const note = createNewNote(noteRef.key, user);

        noteRef.set(note)
            .then(dispatch(addNoteFulfilledAction(note)))
            .catch((error) => {
                console.error(error);
                dispatch(addNoteRejectedAction());
            });
	};
}

export function editNoteNotebook(noteRef, note, obj) {
    return (dispatch) => {
        if (!note.notebook || note.notebook.name !== obj.notebook.name) {
            const noteNotebookRef = noteRef.child('notebook');

            noteNotebookRef
                .set(obj.notebook)
                .then(dispatch(editNoteFulfilledAction(note, obj)))
                .catch(error => {
                    console.error(error);
                    dispatch(editNoteRejectedAction());
                });
        }
    }
}

export function editNoteTags(noteRef, note, obj) {
    return (dispatch) => {
        const noteTagsRef = noteRef.child('tags');

        // Remove all tags removed from edit input
        const removedTags = getDeletedTags(obj.tags, note);

        if (removedTags && removedTags.length) {
            removedTags.forEach((tag) => {
                noteTagsRef.child(tag.id)
                    .remove()
                    .then(dispatch(editNoteFulfilledAction(note, { tags: [] }) ))
                    .catch((error) => {
                        console.error(error);
                        dispatch(editNoteRejectedAction());
                    });
            });
        }

        // If tags is empty then remove them from note
        if (!obj.tags) {
            noteTagsRef
                .remove()
                .then(dispatch(editNoteFulfilledAction(note, { tags: [] }) ))
                .catch((error) => {
                    console.error(error);
                    dispatch(editNoteRejectedAction());
                });
        } else {
            // Note has tags
            obj.tags = uniq(obj.tags);

            // Update existing tags and add new ones
            obj.tags.forEach((tag) => {
                // if tag has an ID which it should, set that ref
                if (tag.id) {
                    noteRef.child('tags/' + tag.id)
                        .set(tag)
                        .then(dispatch(editNoteFulfilledAction(note, obj)))
                        .catch((error) => {
                            console.error(error);
                            dispatch(editNoteRejectedAction());
                        });
                } else {
                    dispatch(editNoteRejectedAction());
                }
            });
        }
    }
}

export function editNoteLabel(noteRef, note, obj) {
    return (dispatch) => {
        const noteLabelRef = noteRef.child('label');

        if (obj.label && !obj.label.name) {
            noteLabelRef
                .remove()
                .then(dispatch(editNoteFulfilledAction(note, obj)))
                .catch((error) => {
                    console.error(error);
                    dispatch(editNoteRejectedAction());
                });
        } else {
            noteLabelRef
                .set(obj.label)
                .then(dispatch(editNoteFulfilledAction(note, obj)))
                .catch((error) => {
                    console.error(error);
                    dispatch(editNoteRejectedAction());
                });
        }
    }
}

export function editNote(note, obj = null) {
	return (dispatch, getState) => {
		dispatch(editNoteRequestedAction());

		const user = getState().userData.user;
        const notesRef = database.ref('users/' + user.uid + '/notes');
        const noteRef = notesRef.child(note.id);

		if (!note) {
			dispatch(editNoteRejectedAction());
		}

		if (obj) {
            // Edit the note objects if defined
			if (obj.notebook) {
				dispatch(editNoteNotebook(noteRef, note, obj));
			} else if (obj.tags) {
				dispatch(editNoteTags(noteRef, note, obj));
			} else if (obj.label) {
				dispatch(editNoteLabel(noteRef, note, obj));
            }
		} else {
			// Update the rest of the note data if not editing notebook
			noteRef
				.update(note)
				.then(dispatch(editNoteFulfilledAction(note, {})))
				.catch((error) => {
					console.error(error);
					dispatch(editNoteRejectedAction());
				});
		}
	};
}

export function deleteNote(note) {
	return (dispatch, getState) => {
		dispatch(deleteNoteRequestedAction());

		const user = getState().userData.user;
        const notesRef = database.ref('users/' + user.uid + '/notes');

        note = note || getState().noteData.selectedNote || null;

        if (!note) {
            dispatch(deleteNoteRejectedAction());
        } else {
            notesRef.child(note.id)
                .remove()
                .then(dispatch(deleteNoteFulfilledAction(note)))
                .catch((error) => {
                    console.error(error);
                    dispatch(deleteNoteRejectedAction());
                });
        }
	};
}

export function deleteNoteLabel(note) {
	return (dispatch, getState) => {
		dispatch(deleteNoteLabelRequested());

		const user = getState().userData.user;
        const notesRef = database.ref('users/' + user.uid + '/notes');
        const noteRef = notesRef.child(note.id);

        if (!note) {
            dispatch(deleteNoteLabelRejected());
        } else {
            noteRef.child('label')
                .remove()
                .then(() => noteRef.once('value'))
                .then((note) => dispatch(deleteNoteLabelFulfilled(note.val())))
                .catch((error) => {
                    console.error(error);
                    dispatch(deleteNoteLabelRejected());
                });
        }
	};
}

export function selectNote(note) {
	return (dispatch, getState) => {
		dispatch(selectNoteRequestedAction());

		const { user } = getState().userData;
        const notesRef = database.ref('users').child(user.uid + '/notes');
        const { notes } = getState().noteData;

        if (!notes || !notes.length) {
            return dispatch(selectNoteRejectedAction());
        }

		note = notes.find(n => n.id === note.id);

        if (note) {
            notesRef.child(note.id + '/isEditing')
                .set(true)
                .then(dispatch(selectNoteFulfilledAction(note)))
                .catch((error) => {
                    console.error(error);
                    dispatch(selectNoteRejectedAction());
                });
        }
	};
}

export function resetSelectedNote() {
	return (dispatch, getState) => {
		dispatch(resetSelectedNoteRequestedAction());

        const user = getState().userData.user;
        const notesRef = database.ref('users').child(user.uid + '/notes');
        let notes = getState().noteData.notes;

        if (notes) {
            notes.forEach((n) => {
                if (n.isEditing) {
                    notesRef.child(n.id + '/isEditing')
                        .set(false)
                        .then(dispatch(resetSelectedNoteFulfilledAction(n)))
                        .catch((error) => {
                            console.error(error);
                            dispatch(resetSelectedNoteRejectedAction());
                        });
                }
            });
        } else {
            dispatch(resetSelectedNoteRejectedAction());
        }
	};
}

export function filterNotes(filter) {
	return (dispatch, getState) => {
        dispatch(resetSelectedNote());
        dispatch(filterNotesRequestedAction(filter));

        const user = getState().userData.user;
        const notesRef = database.ref('users/' + user.uid + '/notes');

        notesRef.once('value')
            .then((snap) => snap.val())
            .then((notes) => dispatch(filterNotesFulfilledAction(notes, filter)))
            .catch((error) => {
                console.error(error);
                dispatch(filterNotesRejectedAction());
            })
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
 * Delete Note
 */
function deleteNoteRequestedAction() {
	return { type: types.DeleteNoteRequested };
}

function deleteNoteRejectedAction() {
	return { type: types.DeleteNoteRejected };
}

function deleteNoteFulfilledAction(note) {
    return { type: types.DeleteNoteFulfilled, note };
}

/**
 * Delete Note Label
 */

function deleteNoteLabelRequested() {
	return { type: types.DeleteNoteLabelRequested };
}

function deleteNoteLabelRejected() {
	return { type: types.DeleteNoteLabelRejected };
}

function deleteNoteLabelFulfilled(note) {
	return { type: types.DeleteNoteLabelFulfilled, note };
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

/* Filter Notes */
function filterNotesRequestedAction() {
	return { type: types.FilterNotesRequested };
}

function filterNotesRejectedAction() {
	return { type: types.FilterNotesRejected };
}

function filterNotesFulfilledAction(notes, filter) {
	return { type: types.FilterNotesFulfilled, notes, filter };
}

