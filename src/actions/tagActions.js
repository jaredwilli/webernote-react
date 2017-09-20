import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

import { uniq } from '../common/helpers.js';

export function getTags() {
	return dispatch => {
		dispatch(getTagsRequestedAction());

		return database
			.ref('/tags')
			.once('value', snap => {
				const tags = snap.val();

				dispatch(getTagsFulfilledAction(tags));
			})
			.catch(error => {
				console.error(error);
				dispatch(getTagsRejectedAction());
			});
	};
}

export function getTag(tag) {
	return dispatch => {
		dispatch(getTagRequestedAction());

		// debugger
		dispatch(getTagFulfilledAction(tag));
	};
}

export function addTag(tags) {
	return dispatch => {
		const tagsRef = database.ref('/tags');
        let tagList = [];
        
		dispatch(addTagRequestedAction());

        // Remove all tags
		if (!tags || !tags.length) {
			tagsRef.remove();
			dispatch(deleteTagsFulfilledAction());
		}

		// Make tag list unique
		tags = uniq(tags);

		tagsRef.on('value', snap => {
			let remoteTags = snap.val();
			console.log(remoteTags);

			// Only add new tags but make full tagList
			tags.forEach(tag => {
				console.log(remoteTags.hasOwnProperty(tag.label));

                // Add the new tag
				if (tag.className && !remoteTags.hasOwnProperty(tag.label)) {
					delete tag.className;

					const tagRef = tagsRef.push();

					tag.id = tagRef.key;
                    tag.value = tagRef.key;
                    
					tagRef.set(tag);
				}

                dispatch(addTagFulfilledAction(remoteTags));
            });
		});
	};
}

export function editTag(tag) {
	return dispatch => {
		dispatch(editTagRequestedAction());

		return database
			.ref('/tags/' + tag.id)
			.set(tag.label)
			.then(tag => {
				dispatch(editTagFulfilledAction(tag));
			})
			.catch(error => {
				console.error(error);
				dispatch(editTagRejectedAction());
			});
	};
}

export function selectTag(tag) {
	return (dispatch, getState) => {
		const tag = getState().tagData.tags.filter(function(n) {
			return (n.id = tag.id);
		});
	};
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

function addTagFulfilledAction(tagList) {
	return { type: types.AddTagFulfilled, tagList };
}

/**
 * Edit Tag
 */
function editTagRequestedAction() {
	return { type: types.EditTagRequested };
}

function editTagRejectedAction() {
	return { type: types.EditTagRejected };
}

function editTagFulfilledAction(tag) {
	return { type: types.EditTagFulfilled, tag };
}

/**
 * Delete Tags
 */
function deleteTagsFulfilledAction() {
	return { type: types.DeleteTagFulFilled };
}
