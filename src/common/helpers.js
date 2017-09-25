// helper functions
import _ from 'lodash';

export function formatDate(timeStamp) {
    var date = new Date(timeStamp);
	return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

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
 * Generates a unique ID.
 */
export function guid() {
	return (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
}

function s4() {
	return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
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


