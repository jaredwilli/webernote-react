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
    return dispatch => {
        dispatch(addNotebookRequestedAction());

        return database.ref('/notebooks')
            .push(notebook)
            .then((notebook) => {
                dispatch(addNotebookFulfilledAction(notebook));
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
            .set(notebook.name)
            .then((notebook) => {
                dispatch(editNotebookFulfilledAction(notebook));
            })
            .catch((error) => {
                console.error(error);
                dispatch(editNotebookRejectedAction());
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
function getNotebookRequestedAction() {
    return { type: types.GetNotebooksRequested };
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
