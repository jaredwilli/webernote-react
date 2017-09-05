import { database } from '../data/firebase.js';
import * as types from '../constants/actionTypes.js';

export function getState() {
    return (dispatch, getState) => {
        return getState();
    }
}

export function getNotes() {
    return dispatch => {
        dispatch(getNotesRequestedAction());

        return database.ref('/notes').once('value', snap => {
            const notes = snap.val();

            dispatch(getNotesFulfilledAction(notes));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getNotesRejectedAction());
        });
    }
}

export function getNote(id) {
    return (dispatch, getState) => {
        dispatch(getNoteRequestedAction());
        
        // Filter notes by ID to get note
        const note = getState().noteData.notes.filter(function(n) {
            return n.id === id;
        })[0];

        dispatch(getNoteFulfilledAction(note));
    }
}

export function addNote(note) {
    return (dispatch) => {
        dispatch(addNoteRequestedAction());

        return database.ref('/notes')
            .push(note)
            .then((note) => {
                const id = note.key;
                
                note.once('value', snap => {
                    note = {};
                    note[id] = snap.val();
                    dispatch(addNoteFulfilledAction(note));
                });
            })
            .catch((error) => {
                console.error(error);
                dispatch(addNoteRejectedAction());
            });
    }
}

export function editNote(note, notebook = null) {
    return dispatch => {
        dispatch(editNoteRequestedAction());

        if (!note) {
            dispatch(editNoteRejectedAction());
            return;
        }
        
        // if notebook value has changed update note
        if (notebook && notebook.name !== note.notebook) {
            note.notebook = notebook.name;
        }
        
        return database.ref('/notes/' + note.id)
            .update(note)
            .then((note) => {
                dispatch(editNoteFulfilledAction(note));
            })
            .catch((error) => {
                console.error(error);
                dispatch(editNoteRejectedAction());
            });
    }
}

export function deleteNote(id) {
    return dispatch => {
        dispatch(deleteNoteRequestedAction());

        database.ref('/notes/' + id)
            .remove()
            .then(function() {
                dispatch(deleteNoteFulfilledAction())
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteNoteRejectedAction());
            });
    }
}

export function selectNote(id) {
    return (dispatch, getState) => {
        const note = getState().noteData.notes.filter(function(n) {
            return n.id = id;
        });

        database.ref('/notes/' + id + '/isEditing/')
            .set(true);
    }
}

export function resetSelectedNote() {
    return (dispatch, getState) => {
        dispatch(resetSelectedNoteRequestedAction());

        const prevSelected = getState().noteData.notes.filter(function(n) {
            return n.isEditing;
        })[0];
        
        if (prevSelected) {
            prevSelected.isEditing = false;

            database.ref('/notes/' + prevSelected.id + '/isEditing/')
                .set(false)
                .then(dispatch(resetSelectedNoteFulfilledAction()))
                .catch((error) => {
                    console.error(error);
                    dispatch(resetSelectedNoteRejectedAction())
                });
        }
    }
}

/**
 * Get Notes
 */
function getNotesRequestedAction() {
    return { type: types.GetNotesRequested };
}

function getNotesRejectedAction() {
    return { type: types.GetNotesRejected };
}

function getNotesFulfilledAction(notes) {
    return { type: types.GetNotesFulfilled, notes };
}

/**
 * Get Note
 */
function getNoteRequestedAction() {
    return { type: types.GetNoteRequested };
}

function getNoteRejectedAction() {
    return { type: types.GetNoteRejected };
}

function getNoteFulfilledAction(note, notes) {
    return { type: types.GetNoteFulfilled, note, notes };
}

/**
 * Add Note
 */
function addNoteRequestedAction() {
    return { type: types.AddNoteRequested };
}

function addNoteRejectedAction() {
    return { type: types.AddNoteRejected };
}

function addNoteFulfilledAction(note) {
    return { type: types.AddNoteFulfilled, note };
}

/**
 * Edit Note
 */
function editNoteRequestedAction() {
    return { type: types.EditNoteRequested };
}

function editNoteRejectedAction() {
    return { type: types.EditNoteRejected };
}

function editNoteFulfilledAction(note) {
    return { type: types.EditNoteFulfilled, note };
}

/**
 * Delete Note
 */
function deleteNoteRequestedAction() {
    return { type: types.DeleteNoteFulfilled };
}

function deleteNoteRejectedAction() {
    return { type: types.DeleteNoteRejected };
}

function deleteNoteFulfilledAction() {
    return { type: types.DeleteNoteFulfilled };
}

/**
 * Reset Selected Notes
 */
function resetSelectedNoteRequestedAction() {
    return { type: types.ResetSelectedNoteRequested };
}

function resetSelectedNoteRejectedAction() {
    return { type: types.ResetSelectedNoteRejected };
}

function resetSelectedNoteFulfilledAction() {
    return { type: types.ResetSelectedNoteFulfilled };
}
