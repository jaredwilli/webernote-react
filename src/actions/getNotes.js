import ActionTypes from '../constants/actionTypes.js';
import { database } from '../firebase.js';

export function getNotes() {
    return dispatch => {
        dispatch(getNotesRequestedAction());

        return database.ref('/notes').once('value', snap => {
            const notes = snap.val();

            dispatch(getNotesFulfilledAction(notes));
        })
        .catch((error) => {
            console.log(error);
            dispatch(getNotesRejectedAction());
        });
    }
}

function getNotesRequestedAction() {
    return {
        type: ActionTypes.GetNotesRequested
    };
}

function getNotesRejectedAction() {
    return {
        type: ActionTypes.GetNotesRejected
    };
}

function getNotesFulfilledAction(notes) {
    return {
        type: ActionTypes.GetNotesFulfilled,
        notes
    };
}
