import { database } from '../data/firebase';
import * as types from '../constants/actionTypes';

import { getLabelCount, createNewLabel } from '../common/noteHelpers.js';
import { refToArray } from '../common/helpers.js';

export function getLabels(user = null) {
    return (dispatch, getState) => {
        dispatch(getLabelsRequestedAction());

        user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let labelsRef = usersRef.child('guest/labels');

        if (user) {
            labelsRef = usersRef.child(user.uid + '/labels');
        }

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

export function addLabel(label, user = null) {
    return (dispatch, getState) => {
        dispatch(addLabelRequestedAction());

        user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let labelsRef = usersRef.child('guest/labels');

        if (user) {
            labelsRef = usersRef.child(user.uid + '/labels');
        }

        let labelRef = labelsRef.push();
        label = createNewLabel(labelRef.key, label, user);

        labelRef.set(label);
        dispatch(addLabelFulfilledAction(label));
    }
}

export function removeLabel(notes, user = null) {
	return (dispatch, getState) => {
		dispatch(deleteLabelRequestedAction());

        user = user || getState().userData.user;
        const usersRef = database.ref('users');
        let labelsRef = usersRef.child('guest/labels');

        if (user) {
            labelsRef = usersRef.child(user.uid + '/labels');
        }

        labelsRef.once('value', (snap) => {
            if (snap.exists()) {
                const labels = refToArray(snap.val());
                let labelsList = [];

                labels.forEach((l) => {
                    let labelCount = getLabelCount(l, notes);
                    // Remove empty labels
                    if (labelCount.count === 0) {
                        let labelRef = labelsRef.child(l.id);
                        // remove label
                        labelRef.remove();
                    } else {
                        labelsList.push(l);
                    }
                });

                dispatch(deleteLabelFulfilledAction(labelsList));
            }
        });
	};
}

export function listenForDeletedLabels(user = null) {
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

            dispatch(removeLabel(notes, user));
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

function addLabelFulfilledAction(label) {
    return { type: types.AddLabelFulfilled, label };
}

/**
 * Delete Label
 */
function deleteLabelRequestedAction() {
    return { type: types.DeleteLabelRequested };
}

function deleteLabelFulfilledAction(labels) {
    return { type: types.DeleteLabelFulfilled, labels };
}
