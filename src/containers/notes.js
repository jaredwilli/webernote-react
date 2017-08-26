import { connect } from 'react-redux';
import { getNote } from '../actions/actions.js';
import NoteApp from '../components/NoteApp.js';

function mapStateToProps(state) {
    return {
        notes: state.notes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onGetNote: () => dispatch(getNote())
    };
}

const NotesContainer = connect(mapStateToProps, mapDispatchToProps)(NoteApp);

export default NotesContainer;
