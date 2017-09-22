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
            if (tag.label === t.label) {
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
    thing = thing.filter((thing, index, self) => self.findIndex((t) => {
        return t.id === thing.id && t.label === thing.label; 
    }) === index);    
    return thing;
}

export function getDeletedTags(tags, note) {
    let noteTagsCopy = note.tags,
        tagsCopy = tags,
        tagSize = _.size(tagsCopy),
        noteTagSize = _.size(noteTagsCopy);

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

export function createNewNote(refId) {
    const newNote = {
        id: refId,
        userId: 1,
        title: 'Untitled note...',
        notebook: {
            id: "e_RyT-Isyb7Z6s04-tha",
            name: 'General'
        },
        url: '',
        tags: [],
        description: '',
        isEditing: true,
        created_date: new Date().getTime(),
        modified_date: '',
        uid: guid()
    };

}

/**
 * Generate a new tag object
 * 
 * @param {*} refId 
 * @param {*} tag 
 * @param {*} note 
 */
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
 * Generate a new notebook object
 * 
 * @param {*} refId 
 * @param {*} notebook
 * @param {*} note 
 */
export function createNewNotebook(refId, notebook, note) {
    if (!notebook.name) return;

    // Add some extra data to notebook object
    notebook.userId = 1;
    notebook.uid = guid();
    notebook.id = refId.key;
    notebook.value = refId.key;
    notebook.name = notebook.name;

    return notebook;
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


