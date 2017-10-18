// user helper functions

export function copyFbRecord(oldRef, newRef) {
	oldRef.once('value', snap => {
		newRef.set(snap.val(), error => {
			if (error && typeof console !== 'undefined' && console.error) {
				console.error(error);
			}
		});
	});
}

// export function moveFbRecord(oldRef, newRef) {
// 	oldRef.once('value', (snap) => {
// 		newRef.set(snap.val(), (error) => {
// 			if (!error) {
// 				oldRef.remove();
// 			} else if (typeof console !== 'undefined' && console.error) {
// 				console.error(error);
// 			}
// 		});
// 	});
// }

export function moveFbRecord(oldRef, newRef, user) {
	return new Promise((resolve, reject) => {
        oldRef
			.once('value')
			.then((snap) => {
				return newRef.set(snap.val());
			})
			.then(() => {
                newRef.update({
                    uid: user.uid,
                    isAnonymous: user.isAnonymous,
                    online: true,
                    displayName: !user.isAnonymous ? user.displayName : 'guest',
                    email: !user.isAnonymous ? user.email : '',
                    photo: !user.isAnonymous ? user.photoURL : '',
                    created_date: new Date().getTime(),
                    last_login: new Date().getTime()
                });
				return oldRef.set(null);
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
}

/**
 * createNewUser
 *
 * @param {Object} user
 * @param {Object} anon An anonymous user that is upgrading to oauth user
 */
export function createNewUser(user, anon) {
	let obj = {
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
    };

    if (user.notebooks) {
        obj.notebooks = user.notebooks;
    } else if (anon && anon.notebooks) {
        obj.notebooks = user.notebooks;
    }

    if (user.labels) {
        obj.labels = user.labels;
    } else if (anon && anon.labels) {
        obj.labels = user.labels;
    }

    if (user.notes) {
        obj.notes = user.notes;
    } else if (anon && anon.notes) {
        obj.notes = user.notes;
    }

    if (user.tags) {
		obj.tags = user.tags;
    } else if (anon && anon.tags) {
        obj.tags = user.tags;
    }

    return obj;
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
