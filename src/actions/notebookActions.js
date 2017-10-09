import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

import { getNotebookCount, createNewNotebook } from '../common/noteHelpers.js';

export function getNotebooks(user = null) {
    return (dispatch, getState) => {
        dispatch(getNotebooksRequestedAction());

        user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let notebooksRef = usersRef.child('guest/notebooks');

        if (user) {
            notebooksRef = usersRef.child(user.uid + '/notebooks');
        }

		notebooksRef.once('value', (snap) => {
            const notebooks = snap.val();

            dispatch(getNotebooksFulfilledAction(notebooks));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getNotebooksRejectedAction());
        });
    }
}

export function addNotebook(notebook, user = null) {
    return (dispatch, getState) => {
        dispatch(addNotebookRequestedAction());

        user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let notebooksRef = usersRef.child('guest/notebooks');

        if (user) {
            notebooksRef = usersRef.child(user.uid + '/notebooks');
        }

        let notebookRef = notebooksRef.push();
        notebook = createNewNotebook(notebookRef.key, notebook, user);

        notebookRef.set(notebook);
        dispatch(addNotebookFulfilledAction(notebook));
    }
}

export function removeNotebook(notes, user = null) {
	return (dispatch, getState) => {
		dispatch(deleteNotebookRequestedAction());

        user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let notebooksRef = usersRef.child('guest/notebooks');

        if (user) {
            notebooksRef = usersRef.child(user.uid + '/notebooks');
        }

        notebooksRef.once('value', (snap) => {
            if (snap.exists()) {
                const notebooks = snap.val();
                let notebooksList = [];

                Object.keys(notebooks).forEach((n) => {
                    let notebook = notebooks[n];
                    let notebookCount = getNotebookCount(notebook, notes, user);

                    // Remove empty notebooks
                    if (notebookCount.count === 0) {
                        let notebookRef = notebooksRef.child(notebookCount.notebook.id);
                        // remove notebook
                        notebookRef.remove();
                    } else {
                        notebooksList.push(notebook);
                    }
                });

                dispatch(deleteNotebookFulfilledAction(notebooksList));
            }
        });
	};
}

export function listenForDeletedNotebook(user = null) {
    return (dispatch, getState) => {

        user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let notesRef = usersRef.child('guest/notes');

        if (user) {
            notesRef = usersRef.child(user.uid + '/notes');
        }

        notesRef.on('child_removed', (snap) => {
            let notes = getState().noteData.notes;
            const n = snap.val();

            // Filter the deleted note out of current notes state
            notes = notes.filter((note) => {
                return note.id !== n.id;
            });

            dispatch(removeNotebook(notes, user));
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
 * Add Notebook
 */
function addNotebookRequestedAction() {
    return { type: types.AddNotebookRequested };
}

function addNotebookFulfilledAction(notebook) {
    return { type: types.AddNotebookFulfilled, notebook };
}

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
