// helper functions

/**
 * validateUid
 *
 * @param {Object} obj
 * @param {Object} user
 */
export function validateUid(obj, user) {
    console.log(user);
    console.log(obj);

    return user && user.uid === obj.uid;
}

/**
 * refToArray
 *
 * @param {Object} snap
 */
export function refToArray(snap) {
    let newSnap = '';
    if (snap) {
        newSnap = Object.keys(snap).map((s) => {
            return snap[s];
        });
    }
    return newSnap;
}

/**
 * formatDate
 *
 * @param {Date} timeStamp
 */
export function formatDate(timeStamp) {
    var date = new Date(timeStamp);
	return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

/**
 * shorten
 *
 * @description
 * Truncate text and add an ellipsis to the end of it.
 *
 * @param {String} text
 * @param {Number} maxLength
 */
export function shorten(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
        ret = ret.substr(0, maxLength - 1) + '…';
    }
    return ret;
}

/**
 * guid
 *
 * @description
 * Generates a unique ID.
 */
export function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

	return (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
}

/**
 * uniq
 *
 * @description
 * Remove duplicate objects from an array.
 * https://stackoverflow.com/a/36744732/297765
 *
 * @param {Array} thing
 * @returns {Array} thing a unique array of objects.
 */
export function uniq(thing) {
    thing = thing.filter((thing, index, self) => self.findIndex((t) => {
        return t.id === thing.id && t.label === thing.label;
    }) === index);
    return thing;
}

/**
 * checkIfUserExists
 *
 * @param {Object} authData
 */
export function checkIfUserExists(authData, userRef) {
	return userRef
		.child('users')
		.child(authData.uid)
		.once('value')
		.then(dataSnapshot => {
			return Promise.resolve({
				authData,
				userExists: dataSnapshot.exists()
			});
		});
}

// example usage
/* database
	.authWithOAuthPopup(provider)
	.then(checkIfUserExists)
	.then(({ authData, userExists }) => {
		if (userExists) {
			// update user
		} else {
			// go create a user
		}
	})
	.catch(err => {
		console.warn('Error signing in.', err);
	}); */


