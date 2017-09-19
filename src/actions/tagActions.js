import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

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

export function addTag(tag) {
    return dispatch => {
        dispatch(addTagRequestedAction());

        // Remove these fields
        delete tag.className;
        delete tag.value;

        return database.ref('/tags')
            .push(tag)
            .then((tag) => {
                const id = tag.key;
                
                tag.once('value', snap => {
                    tag = {};
                    tag[id] = snap.val();
                    dispatch(addTagFulfilledAction(tag));
                });
            })
            .catch((error) => {
                console.error(error);
                dispatch(addTagRejectedAction());
            });
    }
}

export function editTag(tag) {
    return dispatch => {
        dispatch(editTagRequestedAction());

        return database.ref('/tags/' + tag.id)
            .set(tag.label)
            .then((tag) => {
                dispatch(editTagFulfilledAction(tag));
            })
            .catch((error) => {
                console.error(error);
                dispatch(editTagRejectedAction());
            });
    }
}

export function selectTag(tag) {
    return (dispatch, getState) => {
        
        const tag = getState().tagData.tags.filter(function(n) {
            // debugger
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

function addTagFulfilledAction(tag) {
    return { type: types.AddTagFulfilled, tag };
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
