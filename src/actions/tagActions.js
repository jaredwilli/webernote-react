import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

import { uniq, createNewTag, getDeletedTags } from '../common/helpers.js';

export function getTags() {
    return dispatch => {
        dispatch(getTagsRequestedAction());

        return database.ref('/tags').once('value', snap => {
            const tags = snap.val();

            dispatch(getTagsFulfilledAction(tags));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getTagsRejectedAction());
        });
    }
}

export function getTag(tag) {
    return dispatch => {
        dispatch(getTagRequestedAction());
        
        // debugger
        dispatch(getTagFulfilledAction(tag));
    }
}

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
                
                tag = createNewTag(tagRef, tag, note)
                tagRef.set(tag);
            }
            
            // push to tagList
            tagList.push(tag);
        });

        dispatch(addTagFulfilledAction(tagList));
    }
}

export function editTag(tag) {
    return dispatch => {
        dispatch(editTagsRequestedAction());

        return database.ref('/tags/' + tag.id)
            .set(tag.label)
            .then((tag) => {
                dispatch(editTagsFulfilledAction(tag));
            })
            .catch((error) => {
                console.error(error);
                dispatch(editTagsRejectedAction());
            });
    }
}

export function editTags(tags, note) {
	return dispatch => {
		dispatch(editTagsRequestedAction());

        // Refs to the selectedNote and tags
        const noteRef = database.ref('/notes/' + note.id);
        const tagsRef = database.ref('/tags/');

        
		// Remove all tags if none exist
		if (!tags) {
            noteRef.child('tags').remove();
			dispatch(editTagsFulfilledAction(noteRef.key));
        }

        // Remove all tags removed from edit input
        const removedTags = getDeletedTags(tags, note);

        if (removedTags.length) {
            removedTags.forEach((tag) => {
                noteRef.child('tags/' + tag.id).remove();
            });
        }

        // Get all existing tags to add new and use existing for notes
        tagsRef.once('value')
            .then((snap) => {
                // get all children in tags
                let tagsChildren = snap.val();
                let tagList = [];

                // Loop over the tags array added to selectedNote
                tags.forEach((tag) => {
                    if (tagsChildren && tagsChildren.hasOwnProperty(tag.label)) {
                        return;
                    }

                    // Add new tags to tags and selectedNote
                    if (tag.className && !tagsChildren.hasOwnProperty(tag.id)) {
                        let refId = tagsRef.push();
                        let newTag = createNewTag(refId.key, tag, note);

                        // Set new tag
                        refId.set(newTag);

                        // Set note tags since new tag means note wont have it
                        noteRef.child('tags/' + newTag.id).set(newTag);
                    } else {
                        let noteTagRef = noteRef.child('tags');

                        // Checkout the value of the noteTagsRef for value at tag.id path
                        noteTagRef.once('value')
                            .then((snap) => {
                                // If snap doesn't exist add set the noteTagRef value
                                if (!snap.exists()) {
                                    noteTagRef.set(tag);
                                } else {
                                    return;
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                                dispatch(editTagsRejectedAction());
                            });
                    }
                });

                dispatch(editTagsFulfilledAction(tagsChildren));
            })
            .catch((error) => {
                console.error(error);
                dispatch(editTagsRejectedAction());
            });;
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
 * Edit Tag
 */
function editTagsRequestedAction() {
    return { type: types.EditTagsRequested };
}

function editTagsRejectedAction() {
    return { type: types.EditTagsRejected };
}

function editTagsFulfilledAction(tag) {
    return { type: types.EditTagsFulfilled, tag };
}
