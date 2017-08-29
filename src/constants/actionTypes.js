const actionTypes = {
	GetNotesRequested: 'GET_NOTES_REQUESTED',
	GetNotesRejected: 'GET_NOTES_REJECTED',
    GetNotesFulfilled: 'GET_NOTES_FULFILLED',
    
	AddNoteRequested: 'ADD_NOTE_REQUESTED',
	AddNoteRejected: 'ADD_NOTE_REJECTED',
    AddNoteFulfilled: 'ADD_NOTE_FULFILLED',
    
	EditNoteRequested: 'EDIT_NOTE_REQUESTED',
	EditNoteRejected: 'EDIT_NOTE_REJECTED',
    EditNoteFulfilled: 'EDIT_NOTE_FULFILLED',
    
    SelectNote: 'SELECT_NOTE',
    DeleteNote: 'DELETE_NOTE',

    GetNotebooksRequested: 'GET_NOTEBOOKS_REQUESTED',
	GetNotebooksRejected: 'GET_NOTEBOOKS_REJECTED',
    GetNotebooksFulfilled: 'GET_NOTEBOOKS_FULFILLED',

	AddNotebookRequested: 'ADD_NOTEBOOK_REQUESTED',
	AddNotebookRejected: 'ADD_NOTEBOOK_REJECTED',
    AddNotebookFulfilled: 'ADD_NOTEBOOK_FULFILLED',
    
    EditNotebookRequested: 'EDIT_NOTEBOOK_REQUESTED',
	EditNotebookRejected: 'EDIT_NOTEBOOK_REJECTED',
    EditNotebookFulfilled: 'EDIT_NOTEBOOK_FULFILLED',
};

export default actionTypes;
