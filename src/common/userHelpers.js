// user helper functions
import { deepMerge } from './helpers';
import { DATA_TYPES } from '../constants/noteConst';

/**
 *
 * @param {*} oldRef
 * @param {*} newRef
 */
function copyFbRecord(oldRef, newRef) {
    return new Promise((resolve, reject) => {
        oldRef.once('value').then(snap => {
            return newRef.set(snap.val());
        }).then(() => {
            console.log('Done!');
            resolve();
        }).catch(err => {
            console.log(err.message);
            reject();
        });
    });
}

/**
 *
 * @param {*} oldRef
 * @param {*} newRef
 */
/* export function moveAnonUser(oldRef, newRef, user) {
	return new Promise((resolve, reject) => {
        oldRef
			.once('value')
			.then((anonSnap) => {
                let anonVal = anonSnap.val();

                // Only set the data we want to set
                DATA_TYPES.forEach((type) => {
                    if (anonVal[type]) {
                        newRef.child(type).set(anonVal[type]);
                    }
                });

				return newRef;
            })
			.then(() => {
				console.log('Done!');
				resolve(newRef);
			})
			.catch(err => {
				console.log(err.message);
				reject();
			});
	});
} */

/**
 *
 * @param {*} anonRef
 * @param {*} userRef
 */
export function mergeAnonUser(userRef, anonRef) {
    // Promise for getting the user ref data
    let newUser = new Promise((resolve, reject) => {
        if (!userRef) {
            reject();
        }

        userRef.once('value')
            .then((userSnap) => {
                resolve(userSnap.val());
            })
            .catch((error) => {
                console.log(error.message);
                reject();
            });
    });

    // Promise for getting the anonRef anonymous user data
    let anonUser = new Promise((resolve, reject) => {
        if (!anonRef) {
            reject();
        }

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
            snaps[0] = snaps[0] || {};
            snaps[1] = snaps[1] || {};

            // Create object of things to merge
            let guest = {};
            guest.notes = (snaps[1].notes) ? snaps[1].notes : null;
            guest.notebooks = (snaps[1].notebooks) ? snaps[1].notebooks : null;
            guest.labels = (snaps[1].labels) ? snaps[1].labels : null;
            guest.tags = (snaps[1].tags) ? snaps[1].tags : null;

            var merged = deepMerge(snaps[0], guest);
            return merged;
        });

}

/**
 * createUser
 *
 * @param {Object} user
 * @param {Object} anon An anonymous user that is upgrading to oauth user
 */
export function createUser(user, userRef) {
    userRef.set({
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
        notebooks: {},
        labels: {},
        notes: {},
        tags: []
    })
    .catch((error) => {
        console.error(error.message);
    });
}

export function deleteAnon(anonRef) {
    return anonRef.remove();
}

export function pushAnonToUser(userRef, anonUser) {
	if (anonUser) {
		if (anonUser.notes && anonUser.notes.length) {
			anonUser.notes.forEach(note => {
				userRef.child('notes').push(note);
			});
		}
		// if (anonUser.notebooks && anonUser.notebooks.length) {
		//     anonUser.notebooks.forEach((notebook) => {
		//         userRef.child('notebooks').push(notebook);
		//     });
		// }
		// if (anonUser.tags && anonUser.tags.length) {
		//     anonUser.tags.forEach((tag) => {
		//         userRef.child('tags').push(tag);
		//     });
		// }
		// if (anonUser.labels && anonUser.labels.length) {
		//     anonUser.labels.forEach((label) => {
		//         userRef.child('labels').push(label);
		//     });
		// }
	}
}

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
