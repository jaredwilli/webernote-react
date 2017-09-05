import * as types from '../constants/actionTypes.js';

export default function noteReducer(state = {}, action) {
    switch(action.type) {
        // *** GET NOTES
        case types.GetNotesRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.GetNotesRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error in getting notes'
            });
        }

        case types.GetNotesFulfilled: {
            const notes = action.notes;
            
            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got notes'
            });
            
            if (notes) {
                newState.notes = Object.keys(notes).map(function(k) {
                    notes[k].id = k;
                    return notes[k];
                });
            }
            return newState;
        }

        // *** GET NOTE
        case types.GetNoteRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }
        
        case types.GetNoteRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error in getting note'
            });
        }

        case types.GetNoteFulfilled: {
            const note = action.note;

            if (note) {
                note.isEditing = true;
                state.notes.filter(function(n) {
                    if (n.id === note.id) {
                        n = note;
                    }
                    return n;
                });
            }

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got note'
            });
            
            newState.notes = state.notes;
            newState.selectedNote = note;
            return newState;
        }

        // *** ADD NOTE
        case types.AddNoteRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }
        
        case types.AddNoteRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error adding note'
            });
        }
        
        case types.AddNoteFulfilled: {
            const note = action.note;
            const id = Object.keys(note)[0];

            if (id) {
                note[id].id = id;
                note[id].isEditing = true;
                state.notes.push(note[id]);
            }
            
            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Added note'
            });
            
            newState.notes = state.notes;
            newState.selectedNote = note[id];
            return newState;
        }

        // *** EDIT NOTE
        case types.EditNoteRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }
        
        case types.EditNoteRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error editing note'
            });
        }
        
        case types.EditNoteFulfilled: {
            const note = action.note;
            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Edited note'
            });

            if (note) {
                debugger
            }

            return newState;
        }
        
        // *** DELETE NOTE
        case types.DeleteNoteRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }
        
        case types.DeleteNoteRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error delete note'
            });
        }
        
        case types.DeleteNoteFulfilled: {
            const note = action.note;
            return Object.assign({}, state, {
                inProgress: false,
                success: 'Deleted note'
            });
        }
        
        // *** RESET SELECTED NOTE
        case types.ResetSelectedNoteRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }
        
        case types.ResetSelectedNoteRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error resetting selected note'
            });
        }
        
        case types.ResetSelectedNoteFulfilled: {
            return Object.assign({}, state, {
                inProgress: false,
                success: 'Reset selected note'
            });
        }

        default: 
            return state;
    }
}
