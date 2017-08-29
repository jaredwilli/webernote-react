import React, { Component } from 'react';
import { connect } from 'react-redux';

import NoteNav from './NoteNav.js';
import NoteTypes from './NoteTypes.js';
import NoteList from './NoteList.js';
import EditNote from './EditNote.js';
import AddNote from './AddNote.js';

import NotebooksContainer from './containers/notebooks.js';

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
        this.deleteNote = this.deleteNote.bind(this);
        this.editNote = this.editNote.bind(this);

        this.state = {
            selectedNote: {}
        }
    }
    
    componentDidMount() {
        this.props.onGetNotes();
    }
    
    componentWillMount() {
        this.props.selectedNote;
    }

    selectNote(note) {
        this.setState({
            selectedNote: note
        });
        
        this.props.onSelectNote(note);
    }

    deleteNote(note) {
        this.props.onDeleteNote(note);
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
                                        onDeleteNote={this.props.onDeleteNote} 
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

export default connect((state) => state)(NoteApp);
