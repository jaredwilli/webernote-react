import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

import { compose, notesWithType, typeWithCount } from '../common/highOrderFuncs';
import { createNewNotebook } from '../common/noteHelpers.js';
import { refToArray } from '../common/helpers.js';

export function getNotebooks() {
    return (dispatch, getState) => {
        dispatch(getNotebooksRequestedAction());

        const user = getState().userData.user;
        const notebooksRef = database.ref('users/' + user.uid + '/notebooks');

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

export function addNotebook(notebook) {
    return (dispatch, getState) => {
        dispatch(addNotebookRequestedAction());

        const user = getState().userData.user;
        const notebooksRef = database.ref('users/' + user.uid + '/notebooks');
        const notebookRef = notebooksRef.push();

        notebook = createNewNotebook(notebookRef.key, notebook);

        notebookRef.set(notebook)
            .then(dispatch(addNotebookFulfilledAction(notebook)))
            .catch((error) => {
                console.error(error);
                dispatch(addNotebookRejectedAction());
            });
    }
}

export function removeNotebook(notes) {
	return (dispatch, getState) => {
		dispatch(deleteNotebookRequestedAction());

        const user = getState().userData.user;
        const notebooksRef = database.ref('users/' + user.uid + '/notebooks');

        notebooksRef.once('value', (snap) => {
            const notebooks = refToArray(snap.val());

            notebooks.forEach(notebook => {
                const type = 'notebook';
                const notebookCount = compose(
                    notesWithType(type),
                    typeWithCount(notebook, type, notesWithType(notes, type));

                // Remove empty notebooks
                if (notebookCount === 0) {
                    notebooksRef.child(notebook.id)
                        .remove()
                        .then(() => notebooksRef.once('value'))
                        .then(snap => dispatch(deleteNotebookFulfilledAction(snap.val())))
                        .catch(error => {
                            console.error(error);
                            dispatch(deleteNotebookRejectedAction());
                        });
                }
            });
        });
	};
}

export function listenForDeletedNotebook() {
    return (dispatch, getState) => {

        const user = getState().userData.user;
        if (!user) return;
        const notesRef = database.ref('users/' + user.uid + '/notes');

        notesRef.on('child_removed', (snap) => {
            let notes = getState().noteData.notes;
            const n = snap.val();

            // Filter the deleted note out of current notes state
            notes = notes.filter((note) => {
                return note.id !== n.id;
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
 * Add Notebook
 */
function addNotebookRequestedAction() {
    return { type: types.AddNotebookRequested };
}

function addNotebookRejectedAction() {
    return { type: types.AddNotebookRejected };
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

function deleteNotebookRejectedAction() {
    return { type: types.DeleteNotebookRejected };
}

function deleteNotebookFulfilledAction(notebook, notebooks) {
    return { type: types.DeleteNotebookFulfilled, notebook, notebooks };
}
