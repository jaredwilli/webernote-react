import { database } from '../_data/firebase';
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

        const { user } = getState().userData;
        const labelsRef = database.ref('users/' + user.uid + '/labels');

        notes = notes || getState().noteData.notes;

        labelsRef.once('value', (snap) => {
            if (snap.exists()) {
                const labels = refToArray(snap.val());

                labels.forEach((label) => {
                    let labelCount = getObjCounts({ label }, notes);

                    // Remove empty labels
                    if (labelCount === 0) {
                        labelsRef.child(label.id)
                            .remove()
                            .then(dispatch(deleteLabelFulfilledAction(label)))
                            .catch((error) => {
                                console.error(error);
                                dispatch(deleteLabelRejectedAction());
                            });
                    }
                });
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
            const note = snap.val();

            // Filter the deleted note out of current notes state
            notes = notes.filter((n) => {
                return n.id !== note.id;
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
