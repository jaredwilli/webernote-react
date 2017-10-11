import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

import { createNewTag, getTagCount } from '../common/noteHelpers';
import { refToArray, uniq } from '../common/helpers';

export function getTags() {
    return (dispatch, getState) => {
        dispatch(getTagsRequestedAction());

        const user = getState().userData.user;
        const tagsRef = database.ref('users/' + user.uid + '/tags');

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

export function addTag(tags, note) {
    return (dispatch, getState) => {
        dispatch(addTagRequestedAction());

        const user = getState().userData.user;
        const tagsRef = database.ref('users/' + user.uid + '/tags');

        // Make tag list unique
        tags = uniq(tags);
        let tagList = [];

        // Only add new tags but make full tagList
        tags.forEach((tag) => {
            // if no ID push a new tag to the list
            if (!tag.id && tag.className) {
                const tagRef = tagsRef.push();

                tag = createNewTag(tagRef.key, tag, note, user);

                tagRef.set(tag)
                    .then(dispatch(addTagFulfilledAction(tag)))
                    .catch((error) => {
                        console.error(error);
                        dispatch(addTagRejectedAction());
                    });
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

        const user = getState().userData.user;
        const tagsRef = database.ref('users/' + user.uid + '/tags');

        tagsRef.once('value', (snap) => {
            if (snap.exists()) {
                const tags = refToArray(snap.val());
                let tagsList = [];

                tags.forEach((tag) => {
                    let tagCount = getTagCount(tag, notes);
                    // Remove empty tags
                    if (tagCount.count === 0) {
                        tagsRef.child(tagCount.tag.id)
                            .remove()
                            .then(dispatch(deleteTagsRejectedAction(tag)))
                            .catch((error) => {
                                console.error(error);
                                dispatch(deleteTagsRejectedAction());
                            });;
                    } else {
                        tagsList.push(tag);
                    }
                });

                dispatch(deleteTagsFulfilledAction(tagsList));
            }
        });
	};
}

export function listenForDeletedTags() {
    return (dispatch, getState) => {

        const user = getState().userData.user;
        if (!user) return;
        const notesRef = database.ref('users/' + user.uid + '/notes');

        notesRef.on('child_removed', (snap) => {
            let notes = getState().noteData.notes;
            const n = snap.val();

            // Filter the deleted note out of current notes state
            notes = notes.filter((note) => {
                return note.id !== n.id;
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
