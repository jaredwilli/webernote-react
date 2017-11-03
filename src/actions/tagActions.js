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

export function editTags(tagsObj, notes) {
    return (dispatch) => {
        if (tagsObj.type === 'add_tag') {
            dispatch(addTag(tagsObj.tags, notes));
        } else if (tagsObj.type === 'remove_tag') {
            dispatch(removeTags(tagsObj.tags, notes));
        }
    };
}

export function addTag(tag, note) {
    return (dispatch, getState) => {
        dispatch(addTagRequestedAction());

        const user = getState().userData.user;
        const tagsRef = database.ref('users/' + user.uid + '/tags');

        let tagList = [];

        // Only add new tags but make full tagList
        // if no ID push a new tag to the list
        if (!tag.id && tag.className) {
            const tagRef = tagsRef.push();

            tag = createNewTag(tagRef.key, tag, note);

            tagRef.set(tag)
                .then(dispatch(addTagFulfilledAction(tag)))
                .catch((error) => {
                    console.error(error);
                    dispatch(addTagRejectedAction());
                });
        } else {
            debugger;
            // Add tags
            tagsRef.child(tag.id + '/count')
                .set(tag.count + 1)
                .then(dispatch(addTagFulfilledAction(tag)))
                .catch((error) => {
                    console.error(error);
                    dispatch(addTagRejectedAction());
                });
        }
    }
}

/**
 *
 * @param {Array} removedTags
 * @param {Object} note
 * @param {Array} notes
 */
export function removeTags(tags, notes, deletedNote) {
	return (dispatch, getState) => {
		dispatch(deleteTagsRequestedAction());

        deletedNote = deletedNote || {};

        const user = getState().userData.user;
        const tagsRef = database.ref('users/' + user.uid + '/tags');
        const notes = notes || getState().noteData.notes.filter((n) => {
            return n.id !== deletedNote.id;
        });

        if (tags && tags.length) {
            tags.forEach((tag) => {
                const tagRef = tagsRef.child(tag.id);

                if (tag.count === 0) {
                    tagsRef.child(tag.id)
                        .remove()
                        .then(() => tagsRef.once('value'))
                        .then((tags) => dispatch(deleteTagsFulfilledAction(tags.val())))
                        .catch((error) => {
                            console.error(error);
                            dispatch(deleteTagsRejectedAction());
                        });
                } else {
                    tagRef.once('value', (snap) => {
                        tag = snap.val();

                        tagRef.child('count')
                            .set(tag.count - 1)
                            .then(() => tagsRef.once('value'))
                            .then((tags) => dispatch(deleteTagsFulfilledAction(tags.val())))
                            .catch((error) => {
                                console.error(error);
                                dispatch(deleteTagsRejectedAction());
                            });
                    });
                }
            });
        }
	};
}

export function listenForDeletedTags() {
    return (dispatch, getState) => {

        const user = getState().userData.user;
        if (!user) return;
        const notesRef = database.ref('users/' + user.uid + '/notes');

        notesRef.on('child_removed', (snap) => {
            const deletedNote = snap.val();
            let notes = getState().noteData.notes.filter((n) => {
                return n.id !== deletedNote.id;
            });

            // Only bother to run removeTags if the deleted note had tags
            if (deletedNote.tags) {
                dispatch(removeTags(refToArray(deletedNote.tags), notes, deletedNote));
            }
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
