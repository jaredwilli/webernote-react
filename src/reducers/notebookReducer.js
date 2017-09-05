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
                success: 'Got notebooks'
            });
            
            if (notebooks) {
                newState.notebooks = Object.keys(notebooks).map(function(k) {
                    notebooks[k].id = k;
                    return notebooks[k];
                });
            }
            return newState;
        }

        // *** GET NOTEBOOK
        case types.GetNotebookRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }
        
        case types.GetNotebookRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error in getting note'
            });
        }

        case types.GetNotebookFulfilled: {
            const notebook = action.notebook;
debugger
            if (notebook) {
                state.notebooks.filter(function(n) {
                    if (n.id === notebook.id) {
                        n = notebook;
                    }
                    return n;
                });
            }

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got note'
            });
            
            newState.notebook = state.notebook;
            newState.selectedNotebook = notebook;
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
