/**
 * Higher order functions for doing various common tasks
 *
 */

// const compose = (firstFunc, ...remainingFuncs) => remainingFuncs.reduce((a, b) => (arg) => a(b(arg)), firstFunc);
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const pipe = (...fns) => compose.apply(compose, fns.reverse());


export const usersWithType = (users, type) =>
	users.filter(user => user.hasOwnProperty(type));

/**
 * notesWithType
 *
 * @description Filter the notes list for a given type, notebooks, tags or labels. Checks if the type has a value by checking the length
 * @param {Array} notes
 * @param {String} type A string either `notebook`, `tags`, or `label`.
 * @returns Array of notes that have the type defined and if it has a value.
 */
export const notesWithType = (notes, type) =>
	notes.filter(
		note =>
			note.hasOwnProperty(type) &&
			((Array.isArray(note[type]) && note[type].length) ||
				Object.keys(note[type]).length)
	);

export const typeWithMap = (type, getType) => getType(type).map(t => t);

/**
 * typesWithCount
 *
 * @description Called from within a map, or in the context of a single type object. Used for getting the counts of notes using either a notebook or label to determine whether to delete it and to show the count next to the link in note nav.
 * @param {Object} item Either notebooks or labels object
 * @param {Arrat} notesWithType The filtered array of notes from the function notesWithType
 */
export const typeWithCount = (item, notesWithType) => {
	debugger;
	notesWithType.reduce(
		(sum, note) => (note.notebook.id === item.id ? sum + 1 : sum),
		0
	);
};

export const tagsWithCount = (item, notes) => {
	return notesWithType(notes, 'tags').map(note => {
		item.count = note.tags.reduce(
			(sum, tag) => (tag.id === item.id ? sum + 1 : sum),
			0
		);
		return note;
	});
};
