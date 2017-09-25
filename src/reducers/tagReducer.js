import * as types from '../constants/actionTypes.js';

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
            const tags = action.tags;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got tags'
            });
            
            if (tags) {
                newState.tags = Object.keys(tags).map(function(k) {
                    tags[k].id = k;
                    tags[k].value = k;
                    return tags[k];
                });
            }

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

            if (tag) {
                state.tags.filter(function(n) {
                    if (n.id === tag.id) {
                        n = tag;
                    }
                    return n;
                });
            }

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got tag'
            });
            
            newState.tag = state.tag;
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
            const tag = action.tag[0];

            // action.selectedNote.tags = tag.name;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Selected tag'
            });

            newState.tags.selectedTag = tag;
            return newState;
        }
        
        default: 
            return state;
    }
}
