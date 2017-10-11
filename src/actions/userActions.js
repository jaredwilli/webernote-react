// Facebook URI redirect for authentication
// https://weberuser-7f700.firebaseapp.com/__/auth/handler

import { database } from '../data/firebase.js';
import { auth, fbProvider } from '../data/firebase.js';
import { createNewUser } from '../common/userHelpers.js';
// import { uniq } from '../common/helpers.js';

import * as types from '../constants/actionTypes.js';

export function getUsers() {
    return (dispatch) => {
        dispatch(getUsersRequestedAction());

        const usersRef = database.ref('users');

        usersRef.once('value', (snap) => {
            const users = snap.val();
            dispatch(getUsersFulfilledAction(users));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getUsersRejectedAction());
        });
    }
}

export function getUser(user) {
    return (dispatch) => {
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

export function addUser(user, anonUser) {
    return (dispatch) => {
        dispatch(addUserRequestedAction());

        const userRef = database.ref('users/' + user.uid);

        if (anonUser && anonUser.uid !== user.uid) {
            const anonUserRef = database.ref('users/' + anonUser.uid);
            anonUserRef.once('value', (snap) => {
                // populate user with anonymous users data
                if (snap.exists()) {
                    user = createNewUser(user, snap.val());

                    userRef.set(user)
                        .then(() => {
                            // No longer accessible account so remove
                            anonUserRef.remove();
                            dispatch(addUserFulfilledAction(user))
                        })
                        .catch((error) => {
                            console.error(error);
                            dispatch(addUserRejectedAction());
                        });
                }
            });
        } else {
            user = createNewUser(user);

            userRef.set(user)
                .then(dispatch(addUserFulfilledAction(user)))
                .catch((error) => {
                    console.error(error);
                    dispatch(addUserRejectedAction());
                });
        }

    }
}

export function loginUser(user) {
    return (dispatch, getState) => {
        dispatch(loginUserRequestedAction());

        const anonUser = (auth.currentUser.isAnonymous) ? auth.currentUser : null;

        debugger;

        auth.signInWithPopup(fbProvider)
            .then((result) => {
                dispatch(addUser(result.user, anonUser));
            })
            .catch((error) => {
                console.error(error);
                dispatch(loginUserRejectedAction());
            });
    }
}

export function loginAnonymously() {
    return (dispatch) => {
        dispatch(loginAnonymousRequestedAction());
        // fbProvider.credential()
        auth.signInAnonymously()
            .then((user) => {
                sessionStorage.setItem('currentUser', {
                    user: { uid: user.uid, isAnonymous: user.isAnonymous }
                });

                dispatch(loginAnonymousFulfilledAction(user));
            })
            .catch((error) => {
                console.log(error.code, error.message);
                dispatch(loginAnonymousRejectedAction());
            });
    }
}

export function logoutUser() {
    return (dispatch) => {
        dispatch(logoutUserRequestedAction());

        auth.signOut()
            .then(dispatch(logoutUserFulfilledAction()))
            .catch((error) => {
                console.log(error.code, error.message);
                dispatch(logoutUserRejectedAction());
            });
    }
}

export function listenForAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(getUser(user));
            } else {
                dispatch(loginAnonymously());
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

function addUserRejectedAction() {
    return { type: types.AddUserRejected };
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

function loginUserRejectedAction() {
    return { type: types.LoginUserRejected };
}

function loginUserFulfilledAction(user) {
    return { type: types.LoginUserFulfilled, user };
}

/**
 * Login Anonymous User
 */
function loginAnonymousRequestedAction() {
    return { type: types.LoginAnonymousRequested };
}

function loginAnonymousRejectedAction() {
    return { type: types.LoginAnonymousRejected };
}

function loginAnonymousFulfilledAction(user) {
    return { type: types.LoginAnonymousFulfilled, user };
}

/**
 * Logout User
 */
function logoutUserRequestedAction() {
    return { type: types.LogoutUserRequested };
}

function logoutUserRejectedAction() {
    return { type: types.LogoutUserRejected };
}

function logoutUserFulfilledAction() {
    return { type: types.LogoutUserFulfilled };
}
