import { database, auth, fbProvider } from '../data/firebase.js';

import { mergeAnonUser, createUser, updateUser } from '../common/userHelpers.js';
import { uniq } from '../common/helpers.js';
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

export function getUser(user, userRef, anonUserRef) {
    return (dispatch) => {
        dispatch(getUserRequestedAction);

        // Fetch and update
        function fetchUser(user, userRef, mergedUser) {
            if (user && mergedUser) {
                user = updateUser(user, mergedUser);
                debugger;
                userRef.set(user);
            }

            userRef.once('value', (snap) => {
                user = snap.val();

                dispatch(getUserFulfilledAction(user));
            })
            .catch((error) => {
                console.error(error.message);
                dispatch(getUserRejectedAction);
            });
        }

        // If user is anonymous just get fetch the data
        if (user.isAnonymous) {
            fetchUser(user, userRef);
        } else {
            // If not anonymous user then merge anonymous with the user account
            if (userRef && anonUserRef) {
                // Merge the anonUserRef and userRef data together
                mergeAnonUser(userRef, anonUserRef)
                    .then((mergedUser) => {
                        // remove anonUser
                        anonUserRef.remove();
                        return mergedUser;
                    })
                    .then((mergedUser) => fetchUser(user, userRef, mergedUser))
                    .catch((error) => {
                        console.error(error.message);
                        dispatch(loginUserRejectedAction);
                    });
            } else {
                // Just get the user if anonUserRef not defined
                fetchUser(user, userRef);
            }
        }
    }
}

export function addUser(user, userRef, anonUserRef) {
    return (dispatch) => {
        dispatch(addUserRequestedAction);

        // Set user function
        function setUser(user, userRef, mergedUser) {
            user = createUser(user, mergedUser);

            userRef.set(user)
                .then(() => {
                    userRef.once('value', (snap) => {
                        user = snap.val();
                        dispatch(addUserFulfilledAction(user));
                    })
                    .catch((error) => {
                        console.error(error);
                        dispatch(addUserRejectedAction);
                    });
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(addUserRejectedAction);
                });
        }

        // If user is anonymous just get fetch the data
        if (user.isAnonymous || !anonUserRef) {
            setUser(user, userRef);
        } else {
            // Merge the anonUserRef and userRef data together
            mergeAnonUser(userRef, anonUserRef)
                .then((mergedUser) => {
                    // remove anonUser
                    anonUserRef.remove();
                    return mergedUser;
                })
                .then((mergedUser) => setUser(user, userRef, mergedUser))
                .catch((error) => {
                    console.error(error.message);
                    dispatch(loginUserRejectedAction);
                });
        }
    }
}

export function doesUserExist(user, userRef, anonUserRef) {
    return (dispatch) => {
        userRef.once('value', (snap) => {
            let userExists = snap.exists();

            // User exists so get the user otherwise add the user
            if (userExists) {
                user = snap.val();
                dispatch(getUser(user, userRef, anonUserRef));
            } else {
                dispatch(addUser(user, userRef, anonUserRef));
            }
        })
        .catch((error) => {
            console.error(error);
            dispatch(loginAnonymousRejectedAction);
        });
    }
}

export function loginUser() {
    return (dispatch) => {
        dispatch(loginUserRequestedAction);

        const anonUser = (auth.currentUser && auth.currentUser.isAnonymous) ? auth.currentUser : null;
        let anonUserRef, userRef;

        // Set the anonUserRef here if can
        if (anonUser && anonUser.isAnonymous) {
            anonUserRef = database.ref('users/' + anonUser.uid);
        }

        auth.signInWithPopup(fbProvider)
            .then((result) => {
                let user = result.user;

                // Set the userRef here
                userRef = database.ref('users/' + user.uid);
                dispatch(doesUserExist(user, userRef, anonUserRef));
            })
            .catch((error) => {
                console.error(error);
                dispatch(loginUserRejectedAction);
            });
    }
}

export function loginAnonymously() {
    return (dispatch) => {
        dispatch(loginAnonymousRequestedAction);

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
                dispatch(loginAnonymousRejectedAction);
            });
    }
}

export function logoutUser() {
    return (dispatch) => {
        dispatch(logoutUserRequestedAction);

        const user = auth.currentUser;

        // Log the user out
        auth.signOut()
            .then(() => {
                // set user to be offline
                database.ref('users/' + user.uid + '/online')
                    .set(false)
                    .then(dispatch(logoutUserFulfilledAction(user)))
                    .catch((error) => {
                        console.error(error.code, error.message);
                    });
            })
            .catch((error) => {
                console.error(error.code, error.message);
                dispatch(logoutUserRejectedAction);
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
                anonUserRef = (!anonUserRef && user.isAnonymous) ? userRef : anonUserRef;
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
function loginUserRequestedAction() {
    return { type: types.LoginUserRequested };
}

function loginUserRejectedAction() {
    return { type: types.LoginUserRejected };
}

// function loginUserFulfilledAction(user) {
//     return { type: types.LoginUserFulfilled, user };
// }

/**
 * Login Anonymous User
 */
function loginAnonymousRequestedAction() {
    return { type: types.LoginAnonymousRequested };
}

function loginAnonymousRejectedAction() {
    return { type: types.LoginAnonymousRejected };
}

// function loginAnonymousFulfilledAction(user) {
//     return { type: types.LoginAnonymousFulfilled, user };
// }

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
