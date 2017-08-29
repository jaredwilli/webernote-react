import ActionTypes from '../constants/actionTypes.js';
import { database } from '../firebase.js';

export function editNote(note) {
    return dispatch => {
        dispatch(editNoteRequestedAction());

        const notesRef = database.ref('/notes/' + note.id);

        notesRef.set(note)
            .then((note) => {
                dispatch(editNoteFulfilledAction(note));
            })
            .catch((error) => {
                console.log(error);
                dispatch(editNoteRejectedAction());
            });
    }
}

export function editNotebook(notebook, note) {
    return dispatch => {
        dispatch(editNoteRequestedAction());

        const notesRef = database.ref('/notes/' + note.id + '/notebook');

        notesRef.set(notebook.name)
            .then((note) => {
                dispatch(editNoteFulfilledAction(note));
            })
            .catch((error) => {
                console.log(error);
                dispatch(editNoteRejectedAction());
            });
    }
}

function editNoteRequestedAction() {
    return {
        type: ActionTypes.EditNoteRequested
    };
}

function editNoteRejectedAction() {
    return {
        type: ActionTypes.EditNoteRejected
    };
}

function editNoteFulfilledAction(note) {
    return {
        type: ActionTypes.EditNoteFulfilled,
        note
    };
}

function editNotebookRequestedAction() {
    return {
        type: ActionTypes.EditNotebookRequested
    };
}

function editNotebookRejectedAction() {
    return {
        type: ActionTypes.EditNotebookRejected
    };
}

function editNotebookFulfilledAction(note) {
    return {
        type: ActionTypes.EditNotebookFulfilled,
        note
    };
}
