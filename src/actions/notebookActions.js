import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

export function getNotebooks() {
    return dispatch => {
        dispatch(getNotebooksRequestedAction());

        return database.ref('/notebooks').once('value', snap => {
            const notebooks = snap.val();

            dispatch(getNotebooksFulfilledAction(notebooks));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getNotebooksRejectedAction());
        });
    }
}

export function getNotebook(notebook) {
    return dispatch => {
        dispatch(getNotebookRequestedAction());
        
        dispatch(getNotebookFulfilledAction(notebook));
    }
}

export function addNotebook(notebook) {
    return (dispatch, getState) => {
        dispatch(addNotebookRequestedAction());

        return database.ref('/notebooks')
            .push(notebook)
            .then((notebook) => {
                const id = notebook.key;
                
                notebook.once('value', snap => {
                    notebook = {};
                    notebook[id] = snap.val();
                    
                    dispatch(addNotebookFulfilledAction(notebook));
                });
            })
            .catch((error) => {
                console.error(error);
                dispatch(addNotebookRejectedAction());
            });
    }
}

export function editNotebook(notebook, note) {
    return dispatch => {
        dispatch(editNotebookRequestedAction());

        return database.ref('/notes/' + note.id + '/notebook')
            .update(notebook.name)
            .then(dispatch(editNotebookFulfilledAction(notebook)))
            .catch((error) => {
                console.error(error);
                dispatch(editNotebookRejectedAction());
            });
    }
}

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
function getNotebookRequestedAction() {
    return { type: types.GetNotebooksRequested };
}

function getNotebookRejectedAction() {
    return { type: types.GetNotebooksRejected };
}

function getNotebookFulfilledAction(notebook) {
    return { type: types.GetNotebookFulfilled, notebook };
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
 * Edit Notebook
 */
function editNotebookRequestedAction() {
    return { type: types.EditNotebookRequested };
}

function editNotebookRejectedAction() {
    return { type: types.EditNotebookRejected };
}

function editNotebookFulfilledAction(notebook) {
    return { type: types.EditNotebookFulfilled, notebook };
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
