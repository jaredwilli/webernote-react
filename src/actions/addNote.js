import ActionTypes from '../constants/actionTypes.js';
import { database } from '../firebase.js';

export function addNote(note) {
    return dispatch => {
        dispatch(addNoteRequestedAction());

        const notesRef = database.ref('/notes');

        notesRef.push(note)
        .then(() => {
            dispatch(addNoteFulfilledAction({ 
                note
            }));
        })
        .catch((error) => {
            console.log(error);
            dispatch(addNoteRejectedAction());
        });
    }
}

function addNoteRequestedAction() {
    return {
        type: ActionTypes.AddNoteRequested
    };
}

function addNoteRejectedAction() {
    return {
        type: ActionTypes.AddNoteRejected
    };
}

function addNoteFulfilledAction(note) {
    return {
        type: ActionTypes.AddNoteFulfilled,
        note
    };
}
