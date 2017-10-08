import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

import { createNewTag, getTagCount } from '../common/noteHelpers';
import { validateUid, uniq } from '../common/helpers';

export function getTags() {
    return (dispatch, getState) => {
        dispatch(getTagsRequestedAction());

        const user = getState().userData.user;
        const tagsRef = database.ref('tags');

        tagsRef.once('value', (snap) => {
            const tags = snap.val();

            dispatch(getTagsFulfilledAction(tags, user));
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

        const user = getState().userData.user;
        const tagsRef = database.ref('tags');

        // Make tag list unique
        tags = uniq(tags);
        let tagList = [];

        // Only add new tags but make full tagList
        tags.forEach((tag) => {
            // if no ID push a new tag to the list
            if (!tag.id && tag.className) {
                const tagRef = tagsRef.push();
                tag = createNewTag(tagRef.key, tag, note, user);

                tagRef.set(tag);
            }

            // push to tagList
            tagList.push(tag);
        });

        dispatch(addTagFulfilledAction(tagList, user));
    }
}

export function removeTags(notes) {
	return (dispatch, getState) => {
		dispatch(deleteTagsRequestedAction());

        const user = getState().userData.user;
        const tagsRef = database.ref('tags');

        tagsRef.once('value', (snap) => {
            if (snap.exists()) {
                const tags = snap.val();
                let tagsList = [];

                Object.keys(tags).forEach((t) => {
                    let tag = tags[t];
                    let tagCount = getTagCount(tag, notes, user);

                    // Remove empty tags
                    if (tagCount.count === 0) {
                        let tagRef = tagsRef.child(tagCount.tag.id);
                        // remove tag
                        tagRef.remove();
                    } else {
                        tagsList.push(tags[t]);
                    }
                });

                dispatch(deleteTagsFulfilledAction(tagsList, user));
            }
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
        const user = getState().userData.user;
        const notesRef = database.ref('notes');

        notesRef.on('child_removed', (snap) => {
            let notes = getState().noteData.notes;
            const n = snap.val();

            // Filter the deleted note out of current notes state
            notes = notes.filter((note) => {
                console.log(validateUid(note, user));
                debugger;

                if ((!user || user.uid !== note.uid) || (user && user.uid === note.uid)) {
                    return note.id !== n.id;
                }
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

function getTagsFulfilledAction(tags, user) {
    return { type: types.GetTagsFulfilled, tags, user };
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

function addTagFulfilledAction(tags, user) {
    return { type: types.AddTagFulfilled, tags, user };
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

function deleteTagsFulfilledAction(tags, user) {
    return { type: types.DeleteTagsFulfilled, tags, user };
}
