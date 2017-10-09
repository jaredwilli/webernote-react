import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

import { createNewTag, getTagCount } from '../common/noteHelpers';
import { refToArray, uniq } from '../common/helpers';

export function getTags(user = null) {
    return (dispatch, getState) => {
        dispatch(getTagsRequestedAction());

        user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let tagsRef = usersRef.child('guest/tags');

        if (user) {
            tagsRef = usersRef.child(user.uid + '/tags');
        }

        tagsRef.once('value', (snap) => {
            const tags = snap.val();

            dispatch(getTagsFulfilledAction(tags));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getTagsRejectedAction());
        });
    }
}

export function addTag(tags, note, user = null) {
    return (dispatch, getState) => {
        dispatch(addTagRequestedAction());

        user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let tagsRef = usersRef.child('guest/tags');

        if (user) {
            tagsRef = usersRef.child(user.uid + '/tags');
        }

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

        dispatch(addTagFulfilledAction(tagList));
    }
}

export function removeTags(notes, user = null) {
	return (dispatch, getState) => {
		dispatch(deleteTagsRequestedAction());

        user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let tagsRef = usersRef.child('guest/tags');

        if (user) {
            tagsRef = usersRef.child(user.uid + '/tags');
        }

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

                dispatch(deleteTagsFulfilledAction(tagsList));
            }
        });
	};
}

export function listenForDeletedTags(user = null) {
    return (dispatch, getState) => {

        user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let notesRef = usersRef.child('guest/notes');

        if (user) {
            notesRef = usersRef.child(user.uid + '/notes');
        }

        notesRef.on('child_removed', (snap) => {
            let notes = getState().noteData.notes;
            const n = snap.val();

            // Filter the deleted note out of current notes state
            notes = notes.filter((note) => {
                return note.id !== n.id;
            });

            dispatch(removeTags(notes, user));
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
 * Add Tag
 */
function addTagRequestedAction() {
    return { type: types.AddTagRequested };
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

function deleteTagsFulfilledAction(tags) {
    return { type: types.DeleteTagsFulfilled, tags };
}
