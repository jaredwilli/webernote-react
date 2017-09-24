import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

import { createNewTag, getTagCount, getDeletedTags } from '../common/noteHelpers';
import { uniq } from '../common/helpers';
import { DEFAULTS } from '../constants/noteConst';

export function getTags() {
    return dispatch => {
        dispatch(getTagsRequestedAction());

        return database.ref('tags').once('value', snap => {
            const tags = snap.val();

            dispatch(getTagsFulfilledAction(tags));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getTagsRejectedAction());
        });
    }
}

/* export function getTag(tag) {
    return dispatch => {
        dispatch(getTagRequestedAction());
        dispatch(getTagFulfilledAction(tag));
    }
} */

export function addTag(tags, note) {
    return dispatch => {
        dispatch(addTagRequestedAction());

        // Make tag list unique
        tags = uniq(tags);
        let tagList = [];
        
        // Only add new tags but make full tagList
        tags.forEach((tag) => {
            const tagsRef = database.ref('/tags');
            
            // if no ID push a new tag to the list
            if (!tag.id && tag.className) {
                const tagRef = database.ref('/tags').push();
                tag = createNewTag(tagRef.key, tag, note);

                tagRef.set(tag);
            }
            
            // push to tagList
            tagList.push(tag);
        });

        dispatch(addTagFulfilledAction(tagList));
    }
}

export function removeTags(notes) {
	return dispatch => {
		dispatch(deleteTagsRequestedAction());

        const tagsRef = database.ref('tags');

        tagsRef.once('value', (snap) => {
            const tags = snap.val();

            let tagsList = [];
            
            Object.keys(tags).map((t) => {
                let tag = tags[t];
                let tagCount = getTagCount(tag, notes);

                // Remove empty tags
                if (tagCount.count === 0 && tagCount.tag.name !== DEFAULTS.TAG) {
                    let tagRef = tagsRef.child(tagCount.tag.id);
                    tagRef.remove();
                } else {
                    tagsList.push(tags[t]);
                }
            });
            
            dispatch(deleteTagsFulfilledAction(tagsList));
        });
	};
}

export function selectTag(tag) {
    return (dispatch, getState) => {
        
        const tag = getState().tagData.tags.filter(function(n) {
            return n.id = tag.id;
        });
    }
}

/**
 * Get Tags
 */
function getTagsRequestedAction() {
    return { type: types.GetTagsRequested };
}

function getTagsRejectedAction() {
    return { type: types.GetTagsRejected };
}

function getTagsFulfilledAction(tags) {
    return { type: types.GetTagsFulfilled, tags };
}

/**
 * Get tag
 */
function getTagRequestedAction() {
    return { type: types.GetTagsRequested };
}

function getTagRejectedAction() {
    return { type: types.GetTagsRejected };
}

function getTagFulfilledAction(tag) {
    return { type: types.GetTagFulfilled, tag };
}

/**
 * Add Tag
 */
function addTagRequestedAction() {
    return { type: types.AddTagRequested };
}

function addTagRejectedAction() {
    return { type: types.AddTagRejected };
}

function addTagFulfilledAction(tags) {
    return { type: types.AddTagFulfilled, tags };
}

/**
 * Delete Tags
 */
function deleteTagsRequestedAction() {
    return { type: types.DeleteTagsRequested };
}

function deleteTagsRejectedAction() {
    return { type: types.DeleteTagsRejected };
}

function deleteTagsFulfilledAction(tags) {
    return { type: types.DeleteTagsFulfilled, tags };
}
