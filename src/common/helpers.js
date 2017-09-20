// helper functions

/**
 * 
 * @param {*} timeStamp 
 */
export function formatDate(timeStamp) {
	var date = new Date(timeStamp);
	return (
		date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
	);
}

/**
 * 
 * @param {*} notes 
 */
export function sortNotes(notes) {
	notes
		.sort((a, b) => {
			let aDate = a.created_date; // (a.modified_date !== '') ? a.modified_date : a.created_date;
			let bDate = b.created_date; // (b.modified_date !== '') ? b.modified_date : b.created_date;

			return new Date(aDate).getTime() - new Date(bDate).getTime();
		})
		.reverse();
	return notes;
}

/**
 * 
 * @param {*} notes 
 * @param {*} notebook 
 */
export function getNotebookCount(notes, notebook) {
	let count = 0;

	notes.forEach(function(note) {
		if (note.notebook === notebook.name) {
			count++;
		}
	});
	return count;
}

/**
 * 
 * @param {*} notes 
 * @param {*} tag 
 */
export function getTagCount(notes, tag) {
	let count = 0;

	notes.forEach(function(note) {
		note.tags.forEach(t => {
			if (t.label === tag.label) {
				count++;
			}
		});
	});
	return count;
}

/**
 * 
 * @param {*} noteTags 
 */
export function getTags(noteTags) {
	let tags = [];

	if (noteTags) {
		Object.keys(noteTags).forEach(i => {
			tags.push(noteTags[i].label);
		});
		tags = tags.join(', ');
	}
	return tags;
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
	if (thing !== null && thing.length) return thing;
	// things = new Object();
	// things.thing = new Array();
	// things.thing.push({place:"here",name:"stuff"});
	// things.thing.push({place:"there",name:"morestuff"});
	// things.thing.push({place:"there",name:"morestuff"});

	thing = thing.filter(
		(thing, index, self) =>
			self.findIndex(t => {
				return t.id === thing.id && t.label === thing.label;
			}) === index
	);

	return thing;
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
