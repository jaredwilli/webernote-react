import { database } from '../data/firebase.js';
import { auth, fbProvider } from '../data/firebase.js';

import { mergeAnonUser, createUser, updateUser } from '../common/userHelpers.js';

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

export function getUser(userRef) {
    return (dispatch) => {
        dispatch(getUserRequestedAction());

        userRef.once('value', (snap) => {
            let user = snap.val();
            dispatch(getUserFulfilledAction(user));
        })
        .catch((error) => {
            console.error(error.message);
            dispatch(getUserRejectedAction());
        });
    }
}

export function addUser(userRef) {
    return (dispatch) => {
        dispatch(addUserRequestedAction());

        userRef.once('value', (snap) => {
            let user = snap.val();
            dispatch(addUserFulfilledAction(user))
        })
        .catch((error) => {
            console.error(error.message);
            dispatch(addUserRejectedAction());
        });
    }
}

export function loginUser() {
    return (dispatch) => {
        const anonUser = (auth.currentUser && auth.currentUser.isAnonymous) ? auth.currentUser : null;
        let anonUserRef, userRef;

        // Set the anonUserRef here if can
        if (anonUser && anonUser.isAnonymous) {
            anonUserRef = database.ref('users/' + anonUser.uid);
        }

        auth.signInWithPopup(fbProvider)
            .then((result) => {
                let user = createUser(result.user);

                // Set the userRef here
                userRef = database.ref('users/' + user.uid);

                debugger;
                dispatch(doesUserExist(user, userRef, anonUserRef));
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
        let anonUserRef, userRef;

        auth.signInAnonymously()
            .then((user) => {
                // Set up anonUserRef and userRefs to be the same
                anonUserRef = database.ref('users/' + user.uid);
                userRef = anonUserRef;

                dispatch(doesUserExist(user, userRef, anonUserRef));
            })
            .catch((error) => {
                console.error(error.code, error.message);
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
                console.error(error.code, error.message);
                dispatch(logoutUserRejectedAction());
            });
    }
}

export function doesUserExist(user, userRef, anonUserRef) {
    return (dispatch) => {

        userRef.once('value', (snap) => {
            let userExists = snap.exists();
            let isAnonymous = user.isAnonymous;

            // Just get the anonymous user
            if (userExists && isAnonymous) {
                console.log('User exists: anonymous');
                dispatch(getUser(userRef));
            }
            // Merge any data from anon with the userSnap then get the user
            if (userExists && !isAnonymous) {
                console.log('User exists: not anonymous');
                let userSnap = snap.val();

                mergeAnonUser(userRef, anonUserRef)
                    .then((mergedUser) => {
                        console.log(mergedUser, userSnap);

                        userRef.update(mergedUser)
                            .then(anonUserRef.remove())
                            .then(dispatch(getUser(userRef)))
                            .catch((error) => {
                                console.error(error.message);
                                dispatch(loginUserRejectedAction());
                            });
                    });
            }

            // Just add a new anonymous user
            if (!userExists && isAnonymous) {
                console.log('User doesnt exist: anonymous');

                createUser(user, userRef);

                dispatch(addUser(userRef));
            }
            // Merge any data from anonymous user to new one and add the user
            if (!userExists && !isAnonymous) {
                console.log('User doesnt exist: not anonymous');

                createUser(user, userRef);

                mergeAnonUser(userRef, anonUserRef)
                    .then((mergedUser) => {
                        console.log(mergedUser, user);

                        // Update the userRef
                        userRef.update(mergedUser)
                            .then(anonUserRef.remove())
                            .then(dispatch(addUser(userRef)))
                            .catch((error) => {
                                console.error(error.message);
                                dispatch(loginUserRejectedAction());
                            });
                    });
            }
        })
        .catch((error) => {
            console.error(error);
            dispatch(loginAnonymousRejectedAction());
        });
    }
}

export function listenForAuth() {
    return (dispatch) => {
        let userRef, anonUserRef,
            anonUser = null;

        // Need to some how pass to getUser here the anonymous user to copy data to existing accounts
        auth.onAuthStateChanged((user) => {
            anonUser = (auth.currentUser && auth.currentUser.isAnonymous) ? auth.currentUser : null;

            if (anonUser) {
                anonUserRef = database.ref('users/' + anonUser.uid);
            }

            if (user) {
                userRef = database.ref('users/' + user.uid);
                anonUserRef = (user.isAnonymous) ? userRef : anonUserRef;
                dispatch(doesUserExist(user, userRef, anonUserRef));
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
