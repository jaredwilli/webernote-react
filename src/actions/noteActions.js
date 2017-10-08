import { database } from '../data/firebase.js';

import { createNewNote, createNewTag, getDeletedTags } from '../common/noteHelpers.js';

import { validateUid, refToArray, uniq } from '../common/helpers.js';
// import { deleteNotebook } from '../actions/notebookActions';
// import { deleteTag } from '../actions/tagActions';

import * as types from '../constants/actionTypes.js';

export function getState() {
	return (dispatch, getState) => {
		return getState();
	};
}

export function getNotes() {
    return (dispatch, getState) => {
        dispatch(getNotesRequestedAction());

        const notesRef = database.ref('notes');

        notesRef.once('value', (snap) => {
            // Convert snap to array and filter only valid UID notes
            let notes = refToArray(snap.val()).filter((n) => {
                return validateUid(n, getState().userData.user);
            });

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

export function addNote(note = {}) {
	return (dispatch, getState) => {
        dispatch(addNoteRequestedAction());

		let noteRef = database.ref('notes').push();
		note = createNewNote(noteRef.key, note, getState().userData.user);

		noteRef.set(note);
		dispatch(addNoteFulfilledAction(note));
	};
}

export function editNoteNotebook(obj, note) {
    return (dispatch) => {

        const noteNotebookRef = database.ref('notes/' + note.id + '/notebook');

        if (!note.notebook || note.notebook.name !== obj.notebook.name) {
            noteNotebookRef.set(obj.notebook)
                .then(dispatch(editNoteFulfilledAction(note, obj)))
                .catch((error) => {
                    console.error(error);
                    dispatch(editNoteRejectedAction());
                });
        } else {
            dispatch(editNoteRejectedAction())
        }
    };
}

export function editNoteTags(obj, note) {
    return (dispatch, getState) => {

        const noteTagsRef = database.ref('notes/' + note.id + '/tags');
        const removedTags = getDeletedTags(obj.tags, note);
        // If tags is empty then remove them from note
        if (removedTags) {
            debugger;
            noteTagsRef.child(removedTags[0].id).remove();

            dispatch(editNoteFulfilledAction(note, { tags: [] }));
        } else {
            // Make tag list unique
            obj.tags = uniq(obj.tags);
            obj.tagList = [];

            // Update existing tags and add new ones
            obj.tags.forEach((tag) => {
                // Update the tag by ID
                if (tag.id) {
                    noteTagsRef.child(tag.id)
                        .update(tag);
                } else {
                    // if no ID push a new tag to the list
                    let tagsRef = noteTagsRef.push();
                    // create new tag
                    tag = createNewTag(tagsRef, tag, note, getState().userData.user);

                    tagsRef.set(tag);
                }
            });

            dispatch(editNoteFulfilledAction(note, obj));
        }
    };
}

export function editNote(note, obj = {}) {
    return (dispatch, getState) => {
        dispatch(editNoteRequestedAction());

        const user = getState().userData.user;
        const noteRef = database.ref('notes/' + note.id);

        if (!note) {
            dispatch(editNoteRejectedAction());
            return;
        }

        // Validate UID
        if (validateUid(note, user)) {
            // Handle notebooks and tags
            if (obj.notebook || obj.tags) {
                if (obj.notebook) {
                    dispatch(editNoteNotebook(obj, note));
                } else if (obj.tags) {
                    dispatch(editNoteTags(obj, note));
                }
            } else {
                // Update the rest of the note data if not editing notebook
                noteRef.update(note)
                    .then(dispatch(editNoteFulfilledAction(note, obj)))
                    .catch((error) => {
                        console.error(error);
                        dispatch(editNoteRejectedAction());
                    });
            }
        }

    }
}

export function deleteNote(note) {
	return (dispatch, getState) => {
		dispatch(deleteNoteRequestedAction());

		const notesRef = database.ref('notes');

        // If valid UID
		if (validateUid(note, getState().userData.user)) {
            notesRef.child(note.id)
                .remove()
                .then(dispatch(deleteNoteFulfilledAction(note)))
                .catch(error => {
                    console.error(error);
                    dispatch(deleteNoteRejectedAction());
                });
		} else {
            dispatch(deleteNoteRejectedAction());
		}
	};
}

export function selectNote(note) {
	return (dispatch, getState) => {
		dispatch(selectNoteRequestedAction());

        const notesRef = database.ref('notes');
		const notes = getState().noteData.notes.filter((nb) => {
            return validateUid(nb, getState().userData.user);
        });

		note = notes.filter(function(n) {
			return n.id === note.id;
		})[0];

		notesRef.child(note.id + '/isEditing')
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

        const notesRef = database.ref('notes');
		let notes = getState().noteData.notes.filter((nb) => {
            return validateUid(nb, getState().userData.user);
        });

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
	};
}

export function listenForDeletedNoteNotebook() {
    return (dispatch, getState) => {
        const notebooksRef = database.ref('notebooks');

        notebooksRef.on('child_removed', (snap) => {
            let notebook = getState().notebookData.notebooks;

            // Convert snap to array of objects that include matching UID to user
            const snapNotebooks = refToArray(snap.val()).filter((nb) => {
                return validateUid(nb, getState().userData.user);
            });

            // Filter the deleted notebook out of current notebooks state
            notebook = notebook.filter((n) => {
                return n.id !== snapNotebooks.id;
            });

            dispatch(editNoteNotebook(notebook, getState().noteData.notes));
        });
    }
}
export function listenForDeletedNoteTags() {
    return (dispatch, getState) => {
        const tagsRef = database.ref('tags');

        tagsRef.on('child_removed', (snap) => {
            let tags = getState().tagData.tags;
            // Convert snap to array of objects that include matching UID to user
            const snapTags = refToArray(snap.val()).filter((t) => {
                return validateUid(t, getState().userData.user);
            });

            // Filter the deleted tag out of current tags state
            tags = tags.filter((tag) => {
                return tag.id !== snapTags.id;
            });

            dispatch(editNoteTags(tags, getState().noteData.notes));
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
