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
            const tagList = action.tagList;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Added tags'
            });

            newState.tags = Object.keys(tagList).map(function(t) {
                return tagList[t];
            });
            return newState;
        }
        
        // *** EDIT TAGS
        case types.EditTagsRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }
        
        case types.EditTagsRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error adding tag'
            });
        }
        
        case types.EditTagsFulfilled: {
            const tags = action.tags;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Edited tags'
            });

            newState.tags = Object.keys(tags).map(function(t) {
                return tags[t];
            });
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

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Selected tag'
            });

            newState.tags.selectedTag = tag;
            return newState;
        }
        
        case types.DeleteNoteTagsFulFilled: {
            const noteId = action.noteId;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Deleted note tags',
                noteId
            });

            return newState;
        }
        
        default: 
            return state;
    }
}
