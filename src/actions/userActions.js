import { database } from '../data/firebase.js';
import { auth, fbProvider } from '../data/firebase.js';

import { copyFbRecord, moveFbRecord, createNewUser, pushAnonToUser } from '../common/userHelpers.js';

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

export function getUser(user, anonSnap) {
    return (dispatch) => {
        dispatch(getUserRequestedAction());

        const userRef = database.ref('users/' + user.uid);
        debugger;

        // Take anonymous users data if any and copy to new account
        if (anonSnap && anonSnap.uid !== user.uid) {
            let anonUserRef = database.ref('users/' + anonSnap.uid);

            userRef.once('value', (snap) => {
                let userSnap = snap.val();

                moveFbRecord(anonUserRef, userRef);

                // let newUser = Object.assign({}, userSnap.)

            })
        } else {
            debugger;
            // userRef.once('value', (snap) => {
            //     if (snap.exists()) {
            //         user = snap.val();

            //         debugger;
            //         dispatch(getUserFulfilledAction(user));
            //     } else {
            //         debugger;
            //         dispatch(addUser(user, anonSnap));
            //     }
            // })
            // .catch((error) => {
            //     console.error(error);
            //     dispatch(getUserRejectedAction());
            // });
        }
    }
}

export function addUser(user, anonSnap) {
    return (dispatch) => {
        dispatch(addUserRequestedAction());

        const userRef = database.ref('users/' + user.uid);
        // Take anonymous users data if any and copy to new account
        if (anonSnap && anonSnap.uid !== user.uid) {
            const anonUserRef = database.ref('users/' + anonSnap.uid);

            user = createNewUser(user);

            moveFbRecord(userRef, anonUserRef, user)
                .then((newRef) => {
                    console.log(newRef);
debugger;

                    // user = createNewUser(user)
                    // newRef.update();
                });

            // user = createNewUser(user, anonSnap);

            // Set new user data and cleanup the anonymous user refs
            // userRef.set(user)
            //     .then(dispatch(addUserFulfilledAction(user)))
            //     .then(dispatch(cleanupAnonUser(anonSnap)))
            //     .catch((error) => {
            //         console.error(error);
            //         dispatch(addUserRejectedAction());
            //     });

        } else {
            // Add new user
            user = createNewUser(user);

            userRef.set(user)
                .then((snap) => {
                    dispatch(addUserFulfilledAction(user));
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(addUserRejectedAction());
                });
        }
    }
}

export function cleanupAnonUser(anonSnap) {
    return (dispatch) => {
        database.ref('users/' + anonSnap.uid).remove();

        // this is not supported by firebase currently
        // auth.deleteUser(anonSnap.uid);
    }
}

export function loginUser() {
    return (dispatch) => {
        function _signIn(anonSnap) {
            auth.signInWithPopup(fbProvider)
                .then((result) => {
                    dispatch(checkIfUserExists(result.user, anonSnap));
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(loginUserRejectedAction());
                });
        }

        const anonUser = (auth.currentUser && auth.currentUser.isAnonymous) ? auth.currentUser : null;

        // If anonymous user exists get the data and run login
        if (anonUser && anonUser.isAnonymous) {
            database.ref('users/' + anonUser.uid).once('value', (snap) => {
                let anonSnap = (snap.exists()) ? snap.val() : null;
                _signIn(anonSnap);
            });
        } else {
            _signIn();
        }
    }
}

export function loginAnonymously() {
    return (dispatch) => {
        dispatch(loginAnonymousRequestedAction());

        auth.signInAnonymously()
            .then((user) => {
                dispatch(addUser(user));
                // dispatch(loginAnonymousFulfilledAction(user));
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

/**
 * THIS METHOD ONLY CAUSES ME ISSUES - DEPRECATED
 *
 * First get anonymous user if thats the currentUser,
 * Then on auth state change, if user is set
 *   - check if the user exists yet
 *     - if yes, then get and copy anonUser data to user account
 *       - delete anonUserRef and anonUser auth
 *     - if no, create new userRef and add anonUser data to user data set
 *       - delete anonUserRef and anonUser auth
 */
// export function listenForAuth() {
//     return (dispatch, getState) => {
//         let anon = getState().userData.user;
//         console.log('ANONYMOUS USER LISTENFORAUTH: ', anon);

//         // let unsubscribe = auth.onAuthStateChanged((user) => {
//         //     if (user) {
//         //         dispatch(checkIfUserExists(user));
//         //     } else {
//         //         dispatch(loginAnonymously());
//         //     }
//         // });
//     }
// }

export function userExistsCallback(user, exists, anonSnap) {
    return (dispatch) => {
        if (exists) {
            // Send user and anonSnap to the getUser
            dispatch(getUser(user, anonSnap));
        } else {
            // Otherwise send user and anonSnap to addUser
            dispatch(addUser(user, anonSnap));
        }
    }
}

export function checkIfUserExists(user, anonSnap) {
    return (dispatch) => {
        database.ref('users/' + user.uid).once('value', (snap) => {
            let exists = (snap.val() !== null);
            dispatch(userExistsCallback(user, exists, anonSnap));
        })
        .catch((error) => {
            console.error(error);
            dispatch(loginAnonymousRejectedAction());
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
