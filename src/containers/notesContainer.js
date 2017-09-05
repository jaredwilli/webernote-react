import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActions from '../actions/noteActions';

import NoteNav from '../components/NoteNav';
import NoteTypes from '../components/NoteTypes';

import NoteList from '../components/NoteList';
import EditNote from '../components/EditNote';
import AddNote from '../components/AddNote';

import '../App.css';

const newNote = {
    title: 'Untitled note...',
    notebook: 'General',
    url: '',
    tags: [],
    description: '',
    created_date: new Date().getTime(),
    modified_date: new Date().getTime()
};

class NotesContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.getNote = this.getNote.bind(this);        
        this.addNote = this.addNote.bind(this);
        this.editNote = this.editNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }
    
    getNote(id) {
        this.props.actions.resetSelectedNote();
        this.props.actions.getNote(id);
    }
    
    addNote(e) {
        e.preventDefault();
        this.props.actions.resetSelectedNote();
        this.props.actions.addNote(newNote);
    }

    editNote(note) {
        this.props.actions.editNote(note);
        this.props.actions.getNotes();
    }
    
    deleteNote(id) {
        this.props.actions.deleteNote(id);
        this.props.actions.getNotes();
    }

    render() {
        if (this.props.notes.loading) {
            return (
                <div className="loading">Loading...</div>
            );
        }

        return (
            <div>
                <header>
                    <div id="loginout">
                        <a id="login" href="#">Login</a>
                    </div>
                    <h1><a href="#">Webernote</a></h1>
                </header>
                <div id="pagewrap">
                    <nav id="toolbar">
                        <ul>
                            <li><a href="#">File</a></li>
                            <li><a href="#">Edit</a></li>
                            <li><a href="#">View</a></li>
                            <li><a href="#">Note</a></li>
                            <li><a href="#">Tools</a></li>
                            <li><a href="#">Help</a></li>
                            <li className="new-note">
                                <AddNote addNote={(e) => this.addNote(e)} />
                            </li>
                        </ul>
                    </nav>
                    <nav id="note-types">
                        <NoteTypes />
                    </nav>
                    <table id="resizable">
                        <tbody>
                            <tr>
                                <td>
                                    <NoteNav />
                                </td>
                                <td className="middle note-list-col">
                                    <NoteList notes={this.props.notes}
                                        getNote={(id) => this.getNote(id)}
                                        deleteNote={(id) => this.deleteNote(id)} />
                                </td>
                                <td className="edit-note-col">
                                    <EditNote editNote={(note) => this.editNote(note)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        notes: (state.noteData.notes) ? state.noteData.notes : {
            loading: true
        },
        selectedNote: (state.noteData.selectedNote) ? state.noteData.selectedNote : {
            loading: true
        }
    };
    console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(noteActions, dispatch)
    };
}

// Note list in middle column
// export const NoteContainer = connect(mapStateToProps, mapDispatchToProps)(NoteList);
// export const AddNoteContainer = connect(mapStateToProps, mapDispatchToProps)(AddNote);

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
