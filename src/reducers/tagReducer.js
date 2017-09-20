import * as types from '../constants/actionTypes.js';

import { uniq } from '../common/helpers.js';

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
            
            newState.tags = uniq(newState.tags);
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
            const tagList = action.tagList;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Added tag'
            });

            newState.tags = tagList;
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
