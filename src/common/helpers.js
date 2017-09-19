// helper functions

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
    notes.forEach(function(c) {
        if (c.notebook === notebook.name) {
            count++;
        }
    });
    return count
}

export function getTagCount(notes, tag) {
    let count = 0;

    notes.forEach(function(c) {
        if (c.tags === tag.name) {
            count++;
        }
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
    // things = new Object();
    // things.thing = new Array();
    
    // things.thing.push({place:"here",name:"stuff"});
    // things.thing.push({place:"there",name:"morestuff"});
    // things.thing.push({place:"there",name:"morestuff"});
    
    console.log(thing)

    thing = thing.filter((thing, index, self) => self.findIndex((t) => {
        return t.id === thing.id && t.label === thing.label; 
    }) === index);
    
    console.log(thing)
    return thing;
}
