import * as types from '../constants/actionTypes';
import { refToArray } from '../common/helpers';

export default function notebookReducer(state = {}, action) {
	switch (action.type) {
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
			let notebooks = refToArray(action.notebooks);

			const newState = Object.assign({}, state, {
				inProgress: false,
				success: 'Got notebooks'
			});

			newState.notebooks = notebooks;
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
			const notebook = action.notebook;

			const newState = Object.assign({}, state, {
				inProgress: false,
				success: 'Added notebook'
			});

			newState.notebooks = state.notebooks || [];
			newState.notebooks.push(notebook);

			return newState;
		}

        // *** DELETE NOTEBOOK
        case types.DeleteNotebookRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.DeleteNotebookRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error deleting notebook'
            });
        }

        case types.DeleteNotebookFulfilled: {
            const notebooks = action.notebooks;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Deleted notebook'
            });

            newState.notebooks = notebooks;
            return newState;
        }

		default:
			return state;
	}
}
