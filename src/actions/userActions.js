// Facebook URI redirect for authentication
// https://weberuser-7f700.firebaseapp.com/__/auth/handler

import { database } from '../data/firebase.js';

import { createNewUser } from '../common/userHelpers.js';
// import { uniq } from '../common/helpers.js';

import * as types from '../constants/actionTypes.js';

export function getState() {
    return (dispatch, getState) => {
        return getState();
    }
}

export function getUsers() {
    return dispatch => {
        dispatch(getUsersRequestedAction());

        const usersRef = database.ref('users')
        
        usersRef.once('value', (snap) => {
            if (snap.exists()) {
                const users = snap.val();

                dispatch(getUsersFulfilledAction(users));
            } else {
                dispatch(getUsersRejectedAction());
            }
        })
        .catch((error) => {
            console.error(error);
            dispatch(getUsersRejectedAction());
        });
    }
}

export function getUser(user) {
    return (dispatch, getState) => {
        dispatch(getUserRequestedAction());

        const currentUsers = getState().userData.users;

        user = currentUsers.filter(function(u) {
            return u.uid === user.uid;
        })[0];

        if (user) {
            dispatch(getUserFulfilledAction(user));
        } else {
            dispatch(getUserRejectedAction());
        }
    }
}

export function addUser(user) {
    return (dispatch) => {
        dispatch(addUserRequestedAction());

        const usersRef = database.ref('users');

        let userRef = usersRef.child(user.uid);
        user = createNewUser(user);

        userRef.set(user);
        dispatch(addUserFulfilledAction(user));
    }
}

export function editUser(user) {
    return (dispatch, getState) => {
        dispatch(editUserRequestedAction());

        // refs
        const userRef = database.ref('users/' + user.id);
        
        if (!user) {
            dispatch(editUserRejectedAction());
            return;
        }
        
    debugger
        // Update the rest of the user data if not editing userbook
        database.ref('/users/' + user.id)
            .update(user)
            .then(dispatch(editUserFulfilledAction(user, {})))
            .catch((error) => {
                console.error(error);
                dispatch(editUserRejectedAction());
            });
    }
}

export function deleteUser(id) {
    return dispatch => {
        dispatch(deleteUserRequestedAction());

        database.ref('/users/' + id)
            .remove()
            .then(function() {
                dispatch(deleteUserFulfilledAction())
            })
            .catch((error) => {
                console.error(error);
                dispatch(deleteUserRejectedAction());
            });
    }
}

export function selectUser(user) {
    return (dispatch, getState) => {
        dispatch(selectUserRequestedAction());
        const currentUsers = getState().userData.users;

        user = currentUsers.filter(function(n) {
            return n.id === user.id;
        })[0];

        database.ref('/users/' + user.id + '/isEditing/')
            .set(true)
            .then(dispatch(selectUserFulfilledAction(user)))
            .catch((error) => {
                console.error(error);
                dispatch(selectUserRejectedAction());
            });
    }
}


/**
 * Get Users
 */
function getUsersRequestedAction() {
    return { type: types.GetUsersRequested };
}

function getUsersRejectedAction() {
    return { type: types.GetUsersRejected };
}

function getUsersFulfilledAction(users) {
    return { type: types.GetUsersFulfilled, users };
}

/**
 * Get User
 */
function getUserRequestedAction() {
    return { type: types.GetUserRequested };
}

function getUserRejectedAction() {
    return { type: types.GetUserRejected };
}

function getUserFulfilledAction(user) {
    return { type: types.GetUserFulfilled, user };
}

/**
 * Add User
 */
function addUserRequestedAction() {
    return { type: types.AddUserRequested };
}

/* function addUserRejectedAction() {
    return { type: types.AddUserRejected };
} */

function addUserFulfilledAction(user) {
    return { type: types.AddUserFulfilled, user };
}

/**
 * Edit User
 */
function editUserRequestedAction() {
    return { type: types.EditUserRequested };
}

function editUserRejectedAction() {
    return { type: types.EditUserRejected };
}

function editUserFulfilledAction(user, obj) {
    return { type: types.EditUserFulfilled, user, obj };
}

/**
 * Delete User
 */
function deleteUserRequestedAction() {
    return { type: types.DeleteUserFulfilled };
}

function deleteUserRejectedAction() {
    return { type: types.DeleteUserRejected };
}

function deleteUserFulfilledAction() {
    return { type: types.DeleteUserFulfilled };
}

/**
 * Select User
 */
function selectUserRequestedAction() {
    return { type: types.SelectUserRequested };
}

function selectUserRejectedAction() {
    return { type: types.SelectUserRejected };
}

function selectUserFulfilledAction(user) {
    return { type: types.SelectUserFulfilled, user };
}

