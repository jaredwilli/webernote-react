// user helper functions
import { auth } from '../data/firebase.js';
import { deepMerge } from './helpers';

export function listenForAuth() {
    // // Need to some how pass to getUser here the anonymous user to copy data to existing accounts
    auth.onAuthStateChanged((user) => {
        return user;
    });
}


/**
 *
 * @param {*} oldRef
 * @param {*} newRef
 */
export function copyFbRecord(oldRef, newRef) {
    return new Promise((resolve, reject) => {
        oldRef.once('value')
            .then((snap) => {
                return newRef.set(snap.val());
            }).then((ref) => {
                resolve(ref);
            }).catch((error) => {
                console.error(error.message);
                reject();
            });
    });
}

/**
 * mergeAnonUser
 *
 * @description combine the anonymous user data with the logged in user account data.
 *
 * @param {*} anonRef
 * @param {*} userRef
 */
export function mergeAnonUser(userRef, anonRef) {
    // Promise for getting the user ref data
    let newUser = new Promise((resolve, reject) => {
        if (!userRef) { resolve({}); }

        userRef.once('value')
            .then((userSnap) => {
                resolve(userSnap.val());
            })
            .catch((error) => {
                console.error(error.message);
                reject();
            });
    });

    // Promise for getting the anonRef anonymous user data
    let anonUser = new Promise((resolve, reject) => {
        if (!anonRef) { resolve({}); }

        anonRef.once('value')
            .then((anonSnap) => {
                resolve(anonSnap.val());
            })
            .catch((error) => {
                console.error(error.message);
                reject();
            });
    });

    // Once these return
    return Promise.all([newUser, anonUser])
        .then((snaps) => {
            let guest = {};
            let merged;

            snaps[0] = snaps[0] || {};
            snaps[1] = snaps[1] || {};

            // Populate guest object if necessary
            if (snaps[1].notebooks) { guest.notebooks = snaps[1].notebooks; }
            if (snaps[1].labels) { guest.labels = snaps[1].labels; }
            if (snaps[1].notes) { guest.notes = snaps[1].notes; }
            if (snaps[1].tags) { guest.tags = snaps[1].tags; }

            if (Object.keys(guest).length) {
                merged = deepMerge(snaps[0], guest);
            }

            return merged;
        });
}

/**
 * createUser
 *
 * @param {Object} user
 */
export function createUser(user, mergedUser) {
    return {
		uid: user.uid,
		isAnonymous: user.isAnonymous,
		online: true, // set to true cuz adding user means they logged in
		displayName: !user.isAnonymous ? user.displayName : 'guest',
		email: !user.isAnonymous ? user.email : '',
		photo: !user.isAnonymous ? user.photoURL : '',
		created_date: new Date().getTime(),
		last_login: new Date().getTime(),
		permissions: [],
        role: '',
        notebooks: (mergedUser && mergedUser.notebooks) ? mergedUser.notebooks : {},
        labels: (mergedUser && mergedUser.labels) ? mergedUser.labels : {},
        notes: (mergedUser && mergedUser.notes) ? mergedUser.notes : {},
        tags: (mergedUser && mergedUser.tags) ? mergedUser.tags : []
    };
}

/**
 * updateUser
 *
 * @param {*} user
 * @param {*} updatedUser
 */
export function updateUser(user, updatedUser) {
    user.notebooks = (updatedUser.notebooks) ? updatedUser.notebooks : user.notebooks || {};
    user.labels = (updatedUser.labels) ? updatedUser.labels : user.labels || {};
    user.notes = (updatedUser.notes) ? updatedUser.notes : user.notes || {};
    user.tags = (updatedUser.tags) ? updatedUser.tags : user.tags || [];
    return user;
}

/**
 * a2z
 *
 * @description Random letter generator from A - Z
 * @param {*} from
 * @param {*} to
 */
export function a2z(from = 'a', to = 'z') {
	let a = 'abcdefghijklmnopqrstuvwxyz'.split('');
	return a.slice(a.indexOf(from), a.indexOf(to) + 1);
}

export function randomVal(arr) {
	if (typeof arr !== Array) {
		arr = Object.keys(arr).map(a => {
			return arr[a];
		});
	}
	return arr[Math.floor(Math.random() * arr.length)];
}

export function randomLetter(from = 'a', to = 'z') {
	return randomVal(a2z(from, to));
}
