import { connect } from 'react-redux';
import { getNotes } from '../actions/getNotes.js';
import { addNote } from '../actions/addNote.js';
import { editNote } from '../actions/editNote.js';
import NoteApp from '../components/NoteApp.js';
import NoteList from '../components/NoteList.js';
import AddNote from '../components/AddNote.js';
import EditNote from '../components/EditNote.js';

function mapStateToProps(state) {
    console.log('STATE: ', state);
    console.log(arguments[1]);

    return {
        notes: state.note
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onGetNotes: () => dispatch(getNotes())
    };
}

// Entire container
const NotesContainer = connect(mapStateToProps, mapDispatchToProps)(NoteApp);

// Note list in middle column
// export const NoteContainer = connect(mapStateToProps, mapDispatchToProps)(NoteList);
// export const AddNoteContainer = connect(mapStateToProps, mapDispatchToProps)(AddNote);
// export const EditNoteContainer = connect(mapStateToProps, mapDispatchToProps)(EditNote);

export default NotesContainer;
