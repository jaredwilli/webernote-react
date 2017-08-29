import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNotes } from '../actions/getNotes.js';
import { addNote } from '../actions/addNote.js';
import { editNote } from '../actions/editNote.js';
import { selectNote } from '../actions/selectNote.js';
import { deleteNote } from '../actions/deleteNote.js';

import NoteNav from '../components/NoteNav.js';
import NoteTypes from '../components/NoteTypes.js';
import NoteList from '../components/NoteList.js';
import EditNote from '../components/EditNote.js';
import AddNote from '../components/AddNote.js';

import '../App.css';

const newNote = {
    title: 'Untitled note...',
    notebook: '',
    url: '',
    tags: '',
    description: '',
    created_date: new Date().getTime(),
    modified_date: new Date().getTime()
};

class NoteApp extends Component {
    constructor(props) {
        super(props);

        this.selectNote = this.selectNote.bind(this);
        this.editNote = this.editNote.bind(this);

        this.state = {
            selectedNote: {}
        }
    }
    
    componentDidMount() {
        this.props.onGetNotes();
    }

    selectNote(note) {
        this.setState({
            selectedNote: note
        });
        
        this.props.onSelectNote(note);
    }
    
    editNote(note) {
        this.setState({
            selectedNote: note
        });
        
        this.props.onEditNote(note);
    }

    render() {
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
                                <button id="newNote" onClick={() => this.props.onAddNote(newNote)}>
                                    <span className="plus">+</span>
                                    Add Note
                                </button>
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
                                    <NoteList onGetNotes={this.props.onGetNotes} 
                                        onSelectNote={(note) => this.selectNote(note)} 
                                        onDeleteNote={(note) => this.props.onDeleteNote(note)} 
                                        notes={this.props.notes} />
                                </td>
                                <td className="edit-note-col">
                                    <EditNote onEditNote={(note) => this.editNote(note)}
                                        selectedNote={this.props.selectedNote} />
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
        notes: state.noteData.notes,
        selectedNote: state.noteData.selectedNote
    };
    
    console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        onGetNotes: () => dispatch(getNotes()),
        onAddNote: (newNote) => {
            dispatch(addNote(newNote));
            dispatch(getNotes()).then((snap) => {
                let notes = snap.val();
                let keys = Object.keys(notes);
                let lastAdded = notes[keys[keys.length - 1]]

                dispatch(selectNote(lastAdded));
            });
        },
        onSelectNote: (selectedNote) => dispatch(selectNote(selectedNote)),
        onDeleteNote: (note) => {
            dispatch(deleteNote(note));
            dispatch(getNotes());
        },
        onEditNote: (editedNote) => {
            dispatch(editNote(editedNote));
        }
    };
}

// Note list in middle column
// export const NoteContainer = connect(mapStateToProps, mapDispatchToProps)(NoteList);
// export const AddNoteContainer = connect(mapStateToProps, mapDispatchToProps)(AddNote);

export default connect(mapStateToProps, mapDispatchToProps)(NoteApp);
