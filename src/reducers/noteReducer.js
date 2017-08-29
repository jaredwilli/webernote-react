import ActionTypes from '../constants/actionTypes.js';

/* {
        title: 'This is an example note...',
        notebook: 'My Notebook',
        url: 'http://anti-code.com',
        tags: 'react, redux, firebase, es6',
        description: 'This note is defined as the initial state of Webernote (v3), an application that is built with React, Redux, and Firebase for storing the data. Written with es6, transpiled with Babel, and built with Webpack.\n\n I\'ve developed this same application 2 times already using jQuery and again with AngularJS. It is a great way to learn new technologies.',
        created_date: new Date().getTime(),
        modified_date: new Date().getTime()
    } */

const initialState = {
    notes: [],
    selectedNote: {}
};

function noteReducer(state = initialState, action) {
    switch(action.type) {
        
        // *** GET NOTES
        case ActionTypes.GetNotesRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case ActionTypes.GetNotesRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error in getting note'
            });
        }

        case ActionTypes.GetNotesFulfilled: {
            const notes = action.notes;
            
            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got notes',
                notes
            });
            
            if (notes) {
                newState.notes = Object.keys(notes).map(function(k) {
                    notes[k].id = k;
                    return notes[k];
                });
            }
            
            return newState;
        }


        // *** ADD NOTES
        case ActionTypes.AddNoteRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }
        
        case ActionTypes.AddNoteRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error adding note'
            });
        }
        
        case ActionTypes.AddNoteFulfilled: {
            const note = action.note;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Added note',
                note
            });

            return newState;
        }


        // *** EDIT NOTES
        case ActionTypes.EditNoteRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }
        
        case ActionTypes.EditNoteRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error editing note'
            });
        }
        
        case ActionTypes.EditNoteFulfilled: {
            const editedNte = action.editedNte;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Edited note',
                editedNte
            });

            return newState;
        }
        

        // *** SELECT NOTE
        case ActionTypes.SelectNote: {
            const selectedNote = action.selectedNote;

            return Object.assign({}, state, {
                inProgress: false,
                success: 'Success',
                selectedNote
            });
        }
        
        
        // *** DELETE NOTE
        case ActionTypes.DeleteNote: {
            const note = action.note;

            return Object.assign({}, state, {
                inProgress: false,
                success: 'Success',
                note
            });
        }
        
        default: 
            return state;
    }
}

export default noteReducer;
