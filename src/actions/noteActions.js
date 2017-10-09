import { database } from '../data/firebase.js';
import * as types from '../constants/actionTypes.js';

import { createNewNote, getDeletedTags } from '../common/noteHelpers.js';
import { uniq } from '../common/helpers.js';

export function getState() {
	return (dispatch, getState) => {
		return getState();
	};
}

export function getNotes(user) {
	return (dispatch, getState) => {
		dispatch(getNotesRequestedAction());

        user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let notesRef = usersRef.child('guest/notes');

        if (user) {
            notesRef = usersRef.child(user.uid + '/notes');
        }

		notesRef.once('value', (snap) => {
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
}*/

export function addNote(user = null) {
	return (dispatch, getState) => {
		dispatch(addNoteRequestedAction());

		user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let notesRef = usersRef.child('guest/notes');

        if (user) {
            notesRef = usersRef.child(user.uid + '/notes');
        }

		let noteRef = notesRef.push();
		let note = createNewNote(noteRef.key, user);

		noteRef.set(note);
		dispatch(addNoteFulfilledAction(note));
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

        if (removedTags.length) {
            removedTags.forEach(tag => {
                noteTagsRef.child(tag.id).remove();
            });
        }

        // If tags is empty then remove them from note
        if (!obj.tags) {
            noteTagsRef.remove();
            dispatch(
                editNoteFulfilledAction(note, {
                    tags: []
                })
            );
        } else {
            // Note has tags
            // Make tag list unique
            obj.tags = uniq(obj.tags);
            obj.tagList = [];

            // Update existing tags and add new ones
            obj.tags.forEach(tag => {
                // if tag has an ID update that ref
                if (tag.id) {
                    let noteTagRef = noteRef.child('/tags/' + tag.id);
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
}

export function editNoteLabel(noteRef, note, obj) {
    return (dispatch) => {

        const noteLabelRef = noteRef.child('label');

        noteLabelRef
            .set(obj.label)
            .then(dispatch(editNoteFulfilledAction(note, obj)))
            .catch(error => {
                console.error(error);
                dispatch(editNoteRejectedAction());
            });
    }
}

export function editNote(note, obj = null, user = null) {
	return (dispatch, getState) => {
		dispatch(editNoteRequestedAction());

		user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let notesRef = usersRef.child('guest/notes');

        if (user) {
            notesRef = usersRef.child(user.uid + '/notes');
        }

        const noteRef = notesRef.child(note.id);

		if (!note) {
			dispatch(editNoteRejectedAction());
			return;
		}

		if (obj) {
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
				.catch(error => {
					console.error(error);
					dispatch(editNoteRejectedAction());
				});
		}
	};
}

export function deleteNote(note, user = null) {
	return (dispatch, getState) => {
		dispatch(deleteNoteRequestedAction());

		user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let notesRef = usersRef.child('guest/notes');

        if (user) {
            notesRef = usersRef.child(user.uid + '/notes');
        }

        notesRef.child(note.id)
            .remove()
            .then(dispatch(deleteNoteFulfilledAction(note)))
            .catch((error) => {
                console.error(error);
                dispatch(deleteNoteRejectedAction());
            });
	};
}

export function selectNote(note, user = null) {
	return (dispatch, getState) => {
		dispatch(selectNoteRequestedAction());

		user = user || getState().userData.user;
		const usersRef = database.ref('users');
        let notesRef = usersRef.child('guest/notes');

        if (user) {
            notesRef = usersRef.child(user.uid + '/notes');
        }

        const currentNotes = getState().noteData.notes;

		note = currentNotes.filter((n) => {
            return n.id === note.id;
        })[0];

        if (!note) {
            note = currentNotes[0];
        }

        notesRef.child(note.id + '/isEditing')
			.set(true)
			.then(dispatch(selectNoteFulfilledAction(note)))
			.catch(error => {
				console.error(error);
				dispatch(selectNoteRejectedAction());
			});
	};
}

export function resetSelectedNote(user) {
	return (dispatch, getState) => {
		dispatch(resetSelectedNoteRequestedAction());

		user = user || getState().userData.user;
		const usersRef = database.ref('users');
        let notesRef = usersRef.child('guest/notes');

        if (user) {
            notesRef = usersRef.child(user.uid + '/notes');
        }

        let notes = getState().noteData.notes;

        if (notes) {
            notes.forEach((n) => {
                if (n.isEditing) {
                    notesRef.child(n.id + '/isEditing')
                        .set(false)
                        .then(dispatch(resetSelectedNoteFulfilledAction(n)))
                        .catch(error => {
                            console.error(error);
                            dispatch(resetSelectedNoteRejectedAction());
                        });
                }
            });
        } else {
            dispatch(resetSelectedNoteFulfilledAction());
        }
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
