// helper functions
import _ from 'lodash';

export function formatDate(timeStamp) {
    var date = new Date(timeStamp);
	return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

export function sortNotes(notes) {
    notes.sort((a, b) => {
        let aDate = a.created_date; // (a.modified_date !== '') ? a.modified_date : a.created_date;
        let bDate = b.created_date; // (b.modified_date !== '') ? b.modified_date : b.created_date;

        return new Date(aDate).getTime() - new Date(bDate).getTime();
    }).reverse();
    return notes;
}

export function getNotebookCount(notes, notebook) {
    let count = 0;
    // iterate over notes
    notes.forEach(function(n) {
        if (n.notebook.name === notebook.name) {
            count++;
        }
    });
    return count
}

export function getTagCount(notes, tag) {
    let count = 0;
    // iterate over notes
    notes.forEach((n) => {
        if (!n.tags.length) return;
        // iterate over note tags
        n.tags.forEach((t) => {
            if (t.label === tag.name) {
                count++;
            }
        })
    });
    return count
}

export function getTags(noteTags) {
    let tags = [];

    if (noteTags) {
        Object.keys(noteTags).forEach((i) => {
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
    if (!thing || thing.length) return thing;
    // things = new Object();
    // things.thing = new Array();
    
    // things.thing.push({place:"here",name:"stuff"});
    // things.thing.push({place:"there",name:"morestuff"});
    // things.thing.push({place:"there",name:"morestuff"});

    thing = thing.filter((thing, index, self) => self.findIndex((t) => {
        return t.id === thing.id && t.label === thing.label; 
    }) === index);    
    return thing;
}

export function getDeletedTags(tags, note) {
    let noteTagsCopy = note.tags;
    let tagsCopy = tags;
    let tagSize = _.size(tagsCopy);
    let noteTagSize = _.size(noteTagsCopy);

    // Need to remove tags if tagSize is smaller than note tags
    if (tagSize < noteTagSize) {
        for (let i = 0; i < tagsCopy.length; i++) {
            for (let j = 0; j < noteTagsCopy.length; j++) {
                // If they match splice it out. whats left needs to be removed.
                if (tagsCopy[i].id === noteTagsCopy[j].id) {
                    noteTagsCopy.splice(j, 1);
                }
            }
        }
        return noteTagsCopy;
    }
    return false;
}

/**
 + * Generate a new tag object
 + * 
 + * @param {*} refId 
 + * @param {*} tag 
 + * @param {*} note 
 + */
 export function createNewTag(refId, tag, note) {
    // no className - not new tag...
    if (!tag.className) return;
    delete tag.className;

    // Add some extra data to tag object
    tag.userId = 1;
    tag.uid = guid();
    tag.id = refId.key;
    tag.value = refId.key;
    tag.label = tag.label;

    return tag;
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


