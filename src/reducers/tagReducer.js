import * as types from '../constants/actionTypes.js';
import { refToArray } from '../common/helpers.js';

export default function tagReducer(state = {}, action) {
    switch(action.type) {

        // *** GET TAGS
        case types.GetTagsRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.GetTagsRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error getting tags'
            });
        }

        case types.GetTagsFulfilled: {
            const tags = refToArray(action.tags);

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got tags'
            });

            newState.tags = tags;
            return newState;
        }

        // *** GET TAG
        case types.GetTagRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.GetTagRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error getting tag'
            });
        }

        case types.GetTagFulfilled: {
            const tag = action.tag;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got tag'
            });

            newState.selectedTag = tag;
            return newState;
        }

        // *** ADD TAGS
        case types.AddTagRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.AddTagRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error adding tag'
            });
        }

        case types.AddTagFulfilled: {
            const tags = action.tags;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Added tag'
            });

            newState.tags = tags;
            return newState;
        }

        // *** DELETE TAGS
        case types.DeleteTagsRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.DeleteTagsRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error deleting tags'
            });
        }

        case types.DeleteTagsFulfilled: {
            const tags = action.tags;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Deleted tags'
            });

            newState.tags = tags;
            return newState;
        }

        // *** SELECT TAGS
        case types.SelectTagRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.SelectTagRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error selecting tag'
            });
        }

        case types.SelectTagFulfilled: {
            const tag = action.tag;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Selected tag'
            });

            newState.selectedTag = tag;
            return newState;
        }

        default:
            return state;
    }
}
