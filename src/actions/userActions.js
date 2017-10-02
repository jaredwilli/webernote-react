// Facebook URI redirect for authentication
// https://weberuser-7f700.firebaseapp.com/__/auth/handler

import { database } from '../data/firebase.js';
import { auth, fbProvider } from '../data/firebase.js';
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

        const usersRef = database.ref('users');
        
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

        const userRef = database.ref('users/' + user.uid);
        
        userRef.once('value', (snap) => {
            if (snap.exists()) {
                user = snap.val();
                dispatch(getUserFulfilledAction(user));
            } else {
                dispatch(addUser(user));
            }
        })
        .catch((error) => {
            console.error(error);
            dispatch(getUserRejectedAction());
        });
    }
}

export function addUser(user) {
    return (dispatch) => {
        dispatch(addUserRequestedAction());

        const usersRef = database.ref('users');
        let userRef = usersRef.child(user.uid);
        user = createNewUser(user);

        userRef.set(user)
            .then(dispatch(addUserFulfilledAction(user)));
    }
}

export function loginUser(user) {
    return (dispatch) => {
        dispatch(loginUserRequestedAction());

        if (user) {
            dispatch(getUser(user));
        } else {
            auth.signInWithPopup(fbProvider)
                .then((res) => {
                    user = res.user;                
                    dispatch(getUser(user));
                });
        }
    }
}

export function logoutUser() {
    return (dispatch) => {
        dispatch(logoutUserRequestedAction());
        
        auth.signOut()
            .then(() => {
                dispatch(logoutUserFulfilledAction());
            });
    }
}

export function listenForAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(loginUser(user));
            } else {
                dispatch(logoutUser());
            }
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

function addUserFulfilledAction(user) {
    return { type: types.AddUserFulfilled, user };
}

/**
 * Login User
 */
function loginUserRequestedAction() {
    return { type: types.LoginUserRequested };
}

// function loginUserFulfilledAction() {
//     return { type: types.LoginUserFulfilled };
// }

/**
 * Logout User
 */
function logoutUserRequestedAction() {
    return { type: types.LogoutUserRequested };
}

function logoutUserFulfilledAction() {
    return { type: types.LogoutUserFulfilled };
}
