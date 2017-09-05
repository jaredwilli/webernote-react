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
