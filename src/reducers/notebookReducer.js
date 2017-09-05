import * as types from '../constants/actionTypes.js';

export default function notebookReducer(state = {}, action) {
    switch(action.type) {
        // *** GET NOTEBOOKS
        case types.GetNotebooksRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.GetNotebooksRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error getting notebooks'
            });
        }

        case types.GetNotebooksFulfilled: {
            const notebooks = action.notebooks;
            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got notebooks',
                notebooks
            });

            if (notebooks) {
                // convert to an array and add ID from key
                newState.notebooks = Object.keys(notebooks).map(function(k) {
                    notebooks[k].id = k;
                    return notebooks[k];
                });
            }
            return newState;
        }

        // *** ADD NOTEBOOKS
        case types.AddNotebookRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }
        
        case types.AddNotebookRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error adding notebook'
            });
        }
        
        case types.AddNotebookFulfilled: {
            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Added notebook'
            });
            return newState;
        }
        
        default: 
            return state;
    }
}
