import { database } from '../data/firebase.js';
import { auth, fbProvider } from '../data/firebase.js';
import { createNewUser } from '../common/userHelpers.js';

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

        // Take anonymous users data if any and copy to new account
        if (anonUser && anonUser.uid !== user.uid) {
            const anonUserRef = database.ref('users/' + anonUser.uid);

            anonUserRef.once('value', (snap) => {
                // populate user with anonymous users data
                if (snap.exists()) {
                    user = createNewUser(user, snap.val());
                    // Set new user data and cleanup the anonymous user refs
                    userRef.set(user)
                        .then(() => {
                            // No longer accessible account so remove
                            anonUser.delete();
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
    return (dispatch) => {
        const anonUser = (auth.currentUser.isAnonymous) ? auth.currentUser : null;

        auth.signInWithPopup(fbProvider)
            .then((result) => {
                dispatch(getUser(result.user, anonUser));
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

        auth.signInAnonymously()
            .then((user) => {
                // sessionStorage.setItem('currentUser', {
                //     user: { uid: user.uid, isAnonymous: user.isAnonymous }
                // });

                dispatch(loginAnonymousFulfilledAction(user));
            })
            .catch((error) => {
                console.log(error.code, error.message);
                dispatch(loginAnonymousRejectedAction());
            });
    }
}

export function logoutUser() {
    return (dispatch, getState) => {
        dispatch(logoutUserRequestedAction());

        const user = getState().userData.user;

        auth.signOut()
            .then(() => {
                dispatch(logoutUserFulfilledAction(user));
            })
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
function loginUserRejectedAction() {
    return { type: types.LoginUserRejected };
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

function logoutUserFulfilledAction(user) {
    return { type: types.LogoutUserFulfilled, user };
}
