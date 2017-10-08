import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

import { validateUid, refToArray, uniq } from '../common/helpers.js';
import { createNewTag, getTagCount } from '../common/noteHelpers';

export function getTags() {
    return (dispatch, getState) => {
        dispatch(getTagsRequestedAction());

        return database.ref('tags').once('value', snap => {
            // Convert snap to array and filter only valid UID tags
            let tags = refToArray(snap.val()).filter((t) => {
                return validateUid(t, getState().userData.user);
            });

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
    return (dispatch, getState) => {
        dispatch(addTagRequestedAction());

        // Make tag list unique
        tags = uniq(tags);
        let tagList = [];

        // Only add new tags but make full tagList
        tags.forEach((tag) => {
            // if no ID push a new tag to the list
            if (!tag.id && tag.className) {
                const tagRef = database.ref('tags').push();
                tag = createNewTag(tagRef.key, tag, note, getState().userData.user);

                tagRef.set(tag);
            }

            // push to tagList
            tagList.push(tag);
        });

        dispatch(addTagFulfilledAction(tagList));
    }
}

export function removeTags(notes) {
	return (dispatch, getState) => {
		dispatch(deleteTagsRequestedAction());

        const tagsRef = database.ref('tags');

        tagsRef.once('value', (snap) => {
            const tags = refToArray(snap.val()).filter((t) => {
                return validateUid(t, getState().userData.user);
            });
            let tagsList = [];
debugger;
            tags.forEach((t) => {
                let tagCount = getTagCount(t, notes);

                // Remove empty tags
                if (tagCount.count === 0) {
                    let tagRef = tagsRef.child(tagCount.tag.id);
                    // remove tag
                    tagRef.remove();
                } else {
                    tagsList.push(t);
                }
            });

            dispatch(deleteTagsFulfilledAction(tagsList));
        });
	};
}

/* export function selectTag(tag) {
    return (dispatch, getState) => {

        const tag = getState().tagData.tags.filter(function(n) {
            return n.id = tag.id;
        });
    }
} */

export function listenForDeletedTags() {
    return (dispatch, getState) => {
        const notesRef = database.ref('notes');

        notesRef.on('child_removed', (snap) => {
            let notes = getState().noteData.notes;
            const note = refToArray(snap.val()).filter((n) => {
                return validateUid(n, getState().userData.user);
            });

            // Filter the deleted note out of current notes state
            notes = notes.filter((n) => {
                return n.id !== note.id;
            });

            dispatch(removeTags(notes));
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
/* function getTagRequestedAction() {
    return { type: types.GetTagsRequested };
}

function getTagRejectedAction() {
    return { type: types.GetTagsRejected };
}

function getTagFulfilledAction(tag) {
    return { type: types.GetTagFulfilled, tag };
} */

/**
 * Add Tag
 */
function addTagRequestedAction() {
    return { type: types.AddTagRequested };
}

/* function addTagRejectedAction() {
    return { type: types.AddTagRejected };
} */

function addTagFulfilledAction(tags) {
    return { type: types.AddTagFulfilled, tags };
}

/**
 * Delete Tags
 */
function deleteTagsRequestedAction() {
    return { type: types.DeleteTagsRequested };
}

/* function deleteTagsRejectedAction() {
    return { type: types.DeleteTagsRejected };
} */

function deleteTagsFulfilledAction(tags) {
    return { type: types.DeleteTagsFulfilled, tags };
}
