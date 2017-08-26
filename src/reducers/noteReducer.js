import ActionTypes from '../constants/actionTypes.js';

function noteReducer(state = {}, action) {
    switch(action.type) {
        case ActionTypes.GetNotesRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case ActionTypes.GetNotesRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error in getting note'
            });
        }

        case ActionTypes.GetNotesFulfilled: {
            const notes = action.notes;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got notes',
                notes
            });
            
            if (notes) {
                newState.notes = Object.keys(notes).map(k => notes[k]);
            }

            return newState;
        }

        // ADD NOTES
        case ActionTypes.AddNoteRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }
        
        case ActionTypes.AddNoteRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error adding note'
            });
        }
        
        case ActionTypes.AddNoteFulfilled: {
            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Added note'
            });

            return newState;
        }


        // EDIT NOTES
        case ActionTypes.EditNoteRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }
        
        case ActionTypes.EditNoteRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error editing note'
            });
        }
        
        case ActionTypes.EditNoteFulfilled: {
            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Edited note'
            });

            return newState;
        }
        
        default: 
            return null;
    }
}

export default noteReducer;
