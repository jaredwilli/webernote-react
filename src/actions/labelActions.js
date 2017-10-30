import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

import { getObjCounts } from '../common/noteHelpers.js';
import { refToArray } from '../common/helpers.js';

export function getLabels() {
    return (dispatch, getState) => {
        dispatch(getLabelsRequestedAction());

        const user = getState().userData.user;
        const labelsRef = database.ref('users/' + user.uid + '/labels');

		labelsRef.once('value', (snap) => {
            const labels = snap.val();
            dispatch(getLabelsFulfilledAction(labels));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getLabelsRejectedAction());
        });
    }
}

export function addLabel(label) {
    return (dispatch, getState) => {
        dispatch(addLabelRequestedAction());

        const user = getState().userData.user;
        const labelsRef = database.ref('users/' + user.uid + '/labels');
        const labelRef = labelsRef.push();

        label.id = labelRef.key;
        label.name = label.name || '';

        labelRef.set(label)
            .then(dispatch(addLabelFulfilledAction(label)))
            .catch((error) => {
                console.error(error);
                dispatch(addLabelRejectedAction());
            });
    }
}

export function removeLabel(notes) {
	return (dispatch, getState) => {
		dispatch(deleteLabelRequestedAction());

        const user = getState().userData.user;
        const labelsRef = database.ref('users/' + user.uid + '/labels');

        labelsRef.once('value', (snap) => {
            if (snap.exists()) {
                const labels = refToArray(snap.val());
                let labelsList = [];

                labels.forEach((label) => {
                    let labelCount = getObjCounts(label, notes);
                    // Remove empty labels
                    if (labelCount.count === 0) {
                        labelsRef.child(label.id)
                            .remove()
                            .then(dispatch(deleteLabelFulfilledAction(label)))
                            .catch((error) => {
                                console.error(error);
                                dispatch(deleteLabelRejectedAction());
                            });
                    } else {
                        labelsList.push(label);
                    }
                });

                dispatch(deleteLabelFulfilledAction(labelsList));
            }
        });
	};
}

export function listenForDeletedLabels() {
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

            dispatch(removeLabel(notes));
        });
    }
}

/**
 * Get Labels
 */
function getLabelsRequestedAction() {
    return { type: types.GetLabelsRequested };
}

function getLabelsRejectedAction() {
    return { type: types.GetLabelsRejected };
}

function getLabelsFulfilledAction(labels) {
    return { type: types.GetLabelsFulfilled, labels };
}

/**
 * Add Label
 */
function addLabelRequestedAction() {
    return { type: types.AddLabelRequested };
}

function addLabelRejectedAction() {
    return { type: types.AddLabelRejected };
}

function addLabelFulfilledAction(label) {
    return { type: types.AddLabelFulfilled, label };
}

/**
 * Delete Label
 */
function deleteLabelRequestedAction() {
    return { type: types.DeleteLabelRequested };
}

function deleteLabelRejectedAction() {
    return { type: types.DeleteLabelRejected };
}

function deleteLabelFulfilledAction(labels) {
    return { type: types.DeleteLabelFulfilled, labels };
}
