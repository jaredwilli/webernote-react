// helper functions

export function formatDate(timeStamp) {
    var date = new Date(timeStamp);
	return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

export function sortNotes(notes) {
    notes.sort((a, b) => {
        return new Date(a.modified_date).getTime() - new Date(b.modified_date).getTime();
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
        if (c.notebook === tag.name) {
            count++;
        }
    });
    return count
}
