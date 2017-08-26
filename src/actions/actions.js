import ActionTypes from '../constants/actionTypes.js';
import { database } from '../firebase.js';

export function getNote() {
    return dispatch => {
        dispatch(getNoteRequestedAction());

        return database.ref('/').once('value', snap => {
            const note = snap.val();
            dispatch(getNoteFulfilledAction(note));
        })
        .catch((error) => {
            console.log(error);
            dispatch(getNoteRejectedAction());
        });
    }
}

function getNoteRequestedAction() {
    return {
        type: ActionTypes.GetNoteRequested
    };
}

function getNoteRejectedAction() {
    return {
        type: ActionTypes.GetNoteRejected
    };
}

function getNoteFulfilledAction(note) {
    return {
        type: ActionTypes.GetNoteFulFilleded,
        note
    };
}
