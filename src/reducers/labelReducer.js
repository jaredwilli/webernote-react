import * as types from '../constants/actionTypes.js';

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

			if (labels) {
				labels = Object.keys(labels).map(function(k) {
					return labels[k];
				});
			}

			newState.labels = labels;
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
			newState.labels.push(label);

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

            newState.labels = labels;
            return newState;
        }

		default:
			return state;
	}
}
