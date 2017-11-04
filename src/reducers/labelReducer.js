import * as types from '../constants/actionTypes';
import { refToArray } from '../common/helpers';

export default function labelReducer(state = {}, action) {
	switch (action.type) {
		// *** GET LABELS
		case types.GetLabelsRequested: {
			return Object.assign({}, state, {
				inProgress: true,
				error: '',
				success: ''
			});
		}

		case types.GetLabelsRejected: {
			return Object.assign({}, state, {
				inProgress: false,
				error: 'Error getting labels'
			});
		}

		case types.GetLabelsFulfilled: {
			let labels = action.labels;

			const newState = Object.assign({}, state, {
				inProgress: false,
				success: 'Got labels'
			});

			newState.labels = refToArray(labels);
			return newState;
		}

		// *** ADD LABELS
		case types.AddLabelRequested: {
			return Object.assign({}, state, {
				inProgress: true,
				error: '',
				success: ''
			});
		}

		case types.AddLabelRejected: {
			return Object.assign({}, state, {
				inProgress: false,
				error: 'Error adding label'
			});
		}

		case types.AddLabelFulfilled: {
			const label = action.label;

			const newState = Object.assign({}, state, {
				inProgress: false,
				success: 'Added label'
			});

			newState.labels = state.labels || [];
			newState.labels.concat(refToArray(label));
			return newState;
		}

        // *** DELETE LABEL
        case types.DeleteLabelRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.DeleteLabelRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error deleting label'
            });
        }

        case types.DeleteLabelFulfilled: {
            const labels = action.labels;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Deleted label'
            });

            newState.labels = refToArray(labels);
            return newState;
        }

		default:
			return state;
	}
}
