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
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
export function createChainedFunction(...funcs: []) {
    return funcs.filter(func => func != null).reduce(
        (acc, func) => {
            console.log(typeof func === 'function', 'Error: invalid Argument Type, must only provide functions, undefined, or null.'
            );

            return function chainedFunction(...args) {
                acc.apply(this, args);
                func.apply(this, args);
            };
        }, () => {}
    );
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
 * @description A HOC that converts an Object of Objects to Array of Objects.
 * @param {Object} snap
 */
export const refToArray = (snap) => (snap && Object.keys(snap).length) ?
    Object.keys(snap).map((s) => snap[s]) :
    [];


/**
 * formatDate
 *
 * @description A HOC formats timestamps to human readable dates
 * @param {Date} timeStamp
 */
export const formatDate = (timeStamp) => new Date(timeStamp).getMonth() + 1 + '/' + new Date(timeStamp).getDate() + '/' + new Date(timeStamp).getFullYear();

/**
 * shorten
 *
 * @description Truncate text and add an ellipsis to the end of it.
 *
 * @param {String} text
 * @param {Number} maxLength
 */
export const shorten = (text, maxLength) => (text && text.length > maxLength) ? text.substr(0, maxLength - 1) + '…' : text;


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
