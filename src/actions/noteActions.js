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

/* export function getNote(id) {
    return (dispatch, getState) => {
        dispatch(getNoteRequestedAction());
        
        // Filter notes by ID to get note
        const note = getState().noteData.notes.filter(function(n) {
            return n.id === id;
        })[0];
        
        if (!note) {
            dispatch(getNoteRejectedAction());
        }
        
        dispatch(getNoteFulfilledAction(note));
    }
}
 */
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

export function editNote(note, obj = null) {
    return dispatch => {
        dispatch(editNoteRequestedAction());

        if (!note) {
            dispatch(editNoteRejectedAction());
            return;
        }


        if (obj) {
            // If notebook not null and value has changed update the notes notebook only
            if (obj.notebook && obj.notebook.name !== note.notebook) {
                // update the notebook of the note
                database.ref('/notes/' + note.id + '/notebook/')
                    .set(obj.notebook.name)
                    .then(dispatch(editNoteFulfilledAction(note, obj)))
                    .catch((error) => {
                        console.error(error);
                        dispatch(editNoteRejectedAction());
                    });
            } 
            else if (obj.tags && obj.tags !== note.tags) {
                // update the tags of the note
                database.ref('/notes/' + note.id + '/tags/')
                    .set(obj.tags)
                    .then(dispatch(editNoteFulfilledAction(note, obj)))
                    .catch((error) => {
                        console.error(error);
                        dispatch(editNoteRejectedAction());
                    });
            }
        }
        else {
            // Update the rest of the note data if not editing notebook
            database.ref('/notes/' + note.id)
                .update(note)
                .then(dispatch(editNoteFulfilledAction(note)))
                .catch((error) => {
                    console.error(error);
                    dispatch(editNoteRejectedAction());
                });
        }
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

export function selectNote(note) {
    return (dispatch, getState) => {
        dispatch(selectNoteRequestedAction());
        const currentNotes = getState().noteData.notes;

        note = currentNotes.filter(function(n) {
            return n.id === note.id;
        })[0];

        database.ref('/notes/' + note.id + '/isEditing/')
            .set(true)
            .then(dispatch(selectNoteFulfilledAction(note)))
            .catch((error) => {
                console.error(error);
                dispatch(selectNoteRejectedAction());
            });
    }
}

export function resetSelectedNote() {
    return (dispatch, getState) => {
        dispatch(resetSelectedNoteRequestedAction());
        const notes = getState().noteData.notes;

        const note = notes.forEach((n) => {
            if (n.isEditing) {
                database.ref('/notes/' + n.id + '/isEditing/')
                    .set(false)
                    .then(dispatch(resetSelectedNoteFulfilledAction(n)))
                    .catch((error) => {
                        console.error(error);
                        dispatch(resetSelectedNoteRejectedAction());
                    });
            }
        });
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
/* function getNoteRequestedAction() {
    return { type: types.GetNoteRequested };
}

function getNoteRejectedAction() {
    return { type: types.GetNoteRejected };
}

function getNoteFulfilledAction(note) {
    return { type: types.GetNoteFulfilled, note };
} */

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

function editNoteFulfilledAction(note, obj) {
    return { type: types.EditNoteFulfilled, note, obj };
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
 * Select Note
 */
function selectNoteRequestedAction() {
    return { type: types.SelectNoteRequested };
}

function selectNoteRejectedAction() {
    return { type: types.SelectNoteRejected };
}

function selectNoteFulfilledAction(note) {
    return { type: types.SelectNoteFulfilled, note };
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

function resetSelectedNoteFulfilledAction(note) {
    return { type: types.ResetSelectedNoteFulfilled, note };
}
