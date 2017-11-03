import * as types from '../constants/actionTypes.js';
import { refToArray } from '../common/helpers.js';

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
            let notes = refToArray(action.notes);
            let selectedNote = '';

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got notes'
            });

            newState.notes = notes;
            newState.selectedNote = {};

            if (notes.length) {
                notes.forEach((note) => {
                    if (note.isEditing) {
                        selectedNote = note;
                    }

                    note.tags = refToArray(note.tags);
                });

                newState.notes = notes;
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

            newState.notes = state.notes || [];
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

            newState.notes = state.notes;
debugger;
            if (action.obj && action.obj.notebook) {
                note.notebook = action.obj.notebook
            }

            newState.note.tags = (note.tags) ? note.tags : [];

            console.log(newState.note.tags);
debugger;
            if (action.obj && action.obj.label) {
                note.label = action.obj.label
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
            // const selected = action.selected;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Deleted note'
            });

            newState.notes = state.notes;
            newState.notes = newState.notes.filter((n) => {
                return n.id !== note.id;
            });

            newState.selectedNote = {};
            return newState;
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

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Note selected'
            });

            note.isEditing = true;
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

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Reset selected note'
            });

            note.isEditing = false;
            newState.selectedNote = '';
            return newState;
        }

        // *** FILTER NOTES
        case types.FilterNotesRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.FilterNotesRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error filtering notes'
            });
        }

        case types.FilterNotesFulfilled: {
            let notes = refToArray(action.notes);
            let filter = action.filter;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Filtered notes'
            });

            if (notes) {
                notes = notes.map((note) => {
                    note.tags = refToArray(note.tags);
                    return note;
                });
            }

            // Clear filteredNotes if no filters applied
            if (!filter) {
                newState.filteredNotes = null;
                newState.notes = notes;
            } else {
                // Filter by notebook
                if (filter.notebook) {
                    newState.filteredNotes = notes.filter((note) => {
                        return note.notebook && note.notebook.name === filter.notebook;
                    });
                }
                else if (filter.term && filter.type) {
                    // filter by field and keyword
                    newState.filteredNotes = notes.filter((note) => {
                        let term = filter.term.toLowerCase(),
                            type = filter.type,
                            typeVal = note[type.toLowerCase()].toLowerCase();

                        return typeVal.search(term.toString()) !== -1;
                    });
                }
            }

            newState.selectedNote = '';
            return newState;
        }

        default:
            return state;
    }
}
