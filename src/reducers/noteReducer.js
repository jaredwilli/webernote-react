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
            let selectedNote = '';

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got notes'
            });
            
            newState.notes = state.notes;

            if (notes) {
                // Get keys and set id for each note and set selectedNote
                newState.notes = Object.keys(notes).map(function(n) {
                    if (notes[n].isEditing) {
                        selectedNote = notes[n];
                    }

                    // Convert tag objects to arrays
                    if (!notes[n].tags) {
                        notes[n].tags = [];
                    } else {
                        notes[n].tags = Object.keys(notes[n].tags).map((t) => {
                            return notes[n].tags[t];
                        });
                    }
                    return notes[n];
                });
            }
        
            newState.selectedNote = selectedNote;
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

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Added note'
            });

            newState.notes = state.notes;
            newState.notes.push(note);
            
            newState.selectedNote = note;
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
            let note = action.note;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Edited note'
            });

            if (action.obj.notebook) {
                note.notebook = action.obj.notebook
            }

            if (action.obj.tags) {
                note.tags = action.obj.tags;
            } else {
                note.tags = (note.tags) ? note.tags.slice() : [];
            }

            newState.selectedNote = note;
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
        
        // *** SELECT NOTE
        case types.SelectNoteRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }
        
        case types.SelectNoteRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error selecting note'
            });
        }

        case types.SelectNoteFulfilled: {
            const note = action.note;
            note.isEditing = true;
            
            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Note selected: ' + note.title
            });
            
            newState.selectedNote = note;
            return newState;
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
            const note = action.note;
            note.isEditing = false;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Reset selected note' + note.title,
            });

            newState.selectedNote = '';
            return newState;
        }

        default: 
            return state;
    }
}
