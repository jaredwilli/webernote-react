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
