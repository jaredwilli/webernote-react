import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

import { validateUid, refToArray } from '../common/helpers.js';
import { getNotebookCount, createNewNotebook } from '../common/noteHelpers.js';

export function getNotebooks() {
    return (dispatch, getState) => {
        dispatch(getNotebooksRequestedAction());

        const notebooksRef = database.ref('notebooks');

        notebooksRef.once('value', (snap) => {
            // Convert snap to array and filter only valid UID notebooks
            let notebooks = refToArray(snap.val()).filter((nb) => {
                return validateUid(nb, getState().userData.user);
            });

            dispatch(getNotebooksFulfilledAction(notebooks));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getNotebooksRejectedAction());
        });
    }
}

/* export function getNotebook(notebook) {
    return dispatch => {
        dispatch(getNotebookRequestedAction());

        dispatch(getNotebookFulfilledAction(notebook));
    }
} */

export function addNotebook(notebook) {
    return (dispatch, getState) => {
        dispatch(addNotebookRequestedAction());

        let notebookRef = database.ref('notebooks').push();
        notebook = createNewNotebook(notebookRef.key, notebook, getState().userData.user);

        notebookRef.set(notebook);
        dispatch(addNotebookFulfilledAction(notebook));
    }
}

export function removeNotebook(notes) {
	return (dispatch, getState) => {
		dispatch(deleteNotebookRequestedAction());

        const notebooksRef = database.ref('notebooks');

        notebooksRef.once('value', (snap) => {
            let notebooks = refToArray(snap.val()).filter((nb) => {
                return validateUid(nb, getState().userData.user);
            });
            let notebooksList = [];

            notebooks.forEach((nb) => {
                let notebookCount = getNotebookCount(nb, notes);

                // Remove empty notebooks
                if (notebookCount.count === 0) {
                    let notebookRef = notebooksRef.child(notebookCount.notebook.id);
                    // remove notebook
                    notebookRef.remove();
                } else {
                    notebooksList.push(nb);
                }
            });

            dispatch(deleteNotebookFulfilledAction(notebooksList));
        });
	};
}

/* export function editNotebook(notebook, note) {
    return dispatch => {
        dispatch(editNotebookRequestedAction());

        const noteRef = database.ref('/notes/' + note.id);
        const noteBookRef = noteRef.child('/notebook');
        const notebooksRef = database.ref('/notebooks');

        noteBookRef.update(notebook.name)
            .then((notebook) => {
                notebooksRef.once('value', (snap) => {
                    let notebooks = snap.val();

                    dispatch(editNotebookFulfilledAction(notebook, notebooks));
                });
            })
            .catch((error) => {
                console.error(error);
                dispatch(editNotebookRejectedAction());
            });
    }
} */

/* export function selectNotebook(notebook, selectedNote) {
    return (dispatch, getState) => {
        dispatch(selectNotebookRequestedAction());

        const book = getState().notebookData.notebooks.filter(function(n) {
            return n.id === notebook.id;
        });

        dispatch(selectNotebookFulfilledAction(book, selectedNote));
    }
} */

export function listenForDeletedNotebook() {
    return (dispatch, getState) => {
        const notesRef = database.ref('notes');

        notesRef.on('child_removed', (snap) => {
            let notes = getState().noteData.notes;
            const note = refToArray(snap.val()).filter((n) => {
                return validateUid(n, getState().userData.user);
            });

            // Filter the deleted note out of current notes state
            notes = notes.filter((n) => {
                return n.id !== note.id;
            });

            dispatch(removeNotebook(notes));
        });
    }
}

/**
 * Get Notebooks
 */
function getNotebooksRequestedAction() {
    return { type: types.GetNotebooksRequested };
}

function getNotebooksRejectedAction() {
    return { type: types.GetNotebooksRejected };
}

function getNotebooksFulfilledAction(notebooks) {
    return { type: types.GetNotebooksFulfilled, notebooks };
}

/**
 * Get notebook
 */
/* function getNotebookRequestedAction() {
    return { type: types.GetNotebooksRequested };
}

function getNotebookRejectedAction() {
    return { type: types.GetNotebooksRejected };
}

function getNotebookFulfilledAction(notebook) {
    return { type: types.GetNotebookFulfilled, notebook };
} */

/**
 * Add Notebook
 */
function addNotebookRequestedAction() {
    return { type: types.AddNotebookRequested };
}

/* function addNotebookRejectedAction() {
    return { type: types.AddNotebookRejected };
} */

function addNotebookFulfilledAction(notebook) {
    return { type: types.AddNotebookFulfilled, notebook };
}

/**
 * Edit Notebook
 */
/* function editNotebookRequestedAction() {
    return { type: types.EditNotebookRequested };
}

function editNotebookRejectedAction() {
    return { type: types.EditNotebookRejected };
}

function editNotebookFulfilledAction(notebooks) {
    return { type: types.EditNotebookFulfilled, notebooks };
} */

/**
 * Delete Notebook
 */
function deleteNotebookRequestedAction() {
    return { type: types.DeleteNotebookRequested };
}

/* function deleteNotebookRejectedAction() {
    return { type: types.DeleteNotebookRejected };
} */

function deleteNotebookFulfilledAction(notebooks) {
    return { type: types.DeleteNotebookFulfilled, notebooks };
}

/**
 * Select Notebook
 */
/* function selectNotebookRequestedAction() {
    return { type: types.SelectNotebookRequested };
}

function selectNotebookRejectedAction() {
    return { type: types.SelectNotebookRejected };
}

function selectNotebookFulfilledAction(notebook, selectedNote) {
    return { type: types.SelectNotebookFulfilled, notebook, selectedNote };
} */
