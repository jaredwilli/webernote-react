import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

import { getNotebookCount, createNewNotebook } from '../common/noteHelpers.js';
import { DEFAULTS } from '../constants/noteConst';

export function getNotebooks(user) {
    return (dispatch) => {
        dispatch(getNotebooksRequestedAction());

        let notebooksRef;
        
        if (user) {
            notebooksRef = database.ref('users/' + user.uid + '/notebooks');
        } else {
            notebooksRef = database.ref('notebooks');
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

/* export function getNotebook(notebook) {
    return dispatch => {
        dispatch(getNotebookRequestedAction());
        
        dispatch(getNotebookFulfilledAction(notebook));
    }
} */

export function addNotebook(notebook) {
    return (dispatch) => {
        dispatch(addNotebookRequestedAction());

        const notebooksRef = database.ref('/notebooks');
        let notebookRef = notebooksRef.push();
        notebook = createNewNotebook(notebookRef.key, notebook);

        notebookRef.set(notebook);
        dispatch(addNotebookFulfilledAction(notebook));
    }
}

export function removeNotebook(notes) {
	return dispatch => {
		dispatch(deleteNotebookRequestedAction());

        const notebooksRef = database.ref('notebooks');

        notebooksRef.once('value', (snap) => {
            const notebooks = snap.val();
            let notebooksList = [];

            Object.keys(notebooks).forEach((n) => {
                let notebook = notebooks[n];
                let notebookCount = getNotebookCount(notebook, notes);

                // Remove empty notebooks
                if (notebookCount.count === 0 && notebookCount.notebook.name !== DEFAULTS.NOTEBOOK) {
                    let notebookRef = notebooksRef.child(notebookCount.notebook.id);
                    // remove notebook
                    notebookRef.remove();
                } else {
                    notebooksList.push(notebook);
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
