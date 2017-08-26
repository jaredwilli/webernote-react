import ActionTypes from '../constants/actionTypes.js';
import { database } from '../firebase.js';

export function editNote(note) {
    return dispatch => {
        dispatch(editNoteRequestedAction());
        
        const notesRef = database.ref('/notes');
        
        notesRef.push(note)
        .then(() => {
            dispatch(editNoteFulfilledAction({ 
                note
            }));
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
