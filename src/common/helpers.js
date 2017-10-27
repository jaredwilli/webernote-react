// helper functions

/**
 * isObject
 *
 * @param {*} item
 */
export function isObject(item) {
	return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * mergeDeep
 *
 * @param {*} target object to merge data into
 * @param {*} source object containing the data to merge
 */
export function deepMerge(target, source) {
	let output = Object.assign({}, target);
	if (isObject(target) || isObject(source)) {
		Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    Object.assign(output, {
                        [key]: source[key]
                    });
                } else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            } else {
                Object.assign(output, {
                    [key]: source[key]
                });
            }
		});
    }
	return output;
}

export function removeDuplicatesBy(keyFn, array) {
    var mySet = new Set();
    return array.filter((x) => {
        let key = keyFn(x),
            isNew = !mySet.has(key);
        if (isNew) {
            mySet.add(key);
        }
        return isNew;
    });
}

/**
 * refToArray
 *
 * @description Converts a Firebase Objects of Object to Array of Objects.
 * @param {Object} snap
 */
export function refToArray(snap) {
	let newSnap = [];
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
	return (
		date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
	);
}

/**
 * shorten
 *
 * @description Truncate text and add an ellipsis to the end of it.
 *
 * @param {String} text
 * @param {Number} maxLength
 */
export function shorten(text, maxLength) {
	var ret = text;
	if (ret && ret.length > maxLength) {
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
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
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
	thing = thing.filter(
		(thing, index, self) =>
			self.findIndex(t => {
				return t.id === thing.id && t.label === thing.label;
			}) === index
	);
	return thing;
}
