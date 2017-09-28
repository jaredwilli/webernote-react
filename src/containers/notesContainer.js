import _ from 'underscore';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as noteActions from '../actions/noteActions';
import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';

import NoteNav from '../components/NoteNav';
import NoteTypes from '../components/NoteTypes';

import NoteList from '../components/NoteList';
import EditNote from '../components/EditNote';
import AddNote from '../components/AddNote';

import { getSelectedNotebook } from '../common/noteHelpers.js';

import '../App.css';

class NotesContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);

        this.filterList = this.filterList.bind(this);
        this.filterType = this.filterType.bind(this);
        this.filterByNotebook = this.filterByNotebook.bind(this);
    }
    
    addNote(e) {
        e.preventDefault();

        this.props.actions.resetSelectedNote();
        this.props.actions.addNote();
    }
    
    deleteNote(note) {
        const notes = this.props.notes;
        let newSelectedNote = _.some(this.props.notes, (n, index) => {
            if (n.id === note.id) {
                if (index > 0) {
                    return notes[index + 1];
                } else if (index < notes.length) {
                    return notes[index - 1];
                } else {
                    return notes[index - 1];
                }
            }
        });

        this.props.actions.resetSelectedNote();
        this.props.actions.deleteNote(note);
        this.props.actions.selectNote(newSelectedNote);
        this.props.actions.getNotes();
        this.props.actions.getNotebooks();
        this.props.actions.getTags();
    }

    // Filters for the note list and the left nav result counts
    filterByNotebook(e) {
        const notebook = getSelectedNotebook(e, this.props.notebooks);
        
        this.setState({
            canAddNotebook: false,
            notebook: notebook
        });

        // get notebooks again to update the state
        this.props.actions.getNotes({ notebook });
    }

    filterType(e) {
        let filterType = e.target.name;

        console.log(filterType);
        
        // debugger
        // TODO: set a daterange picker value somehow here
        //updatedList = updatedList.filter(function(note) { });
    }

    filterList(e) {
        // TODO: Get the filterType for controlling what to filter based on

        let updatedList = this.state.initialNotes;
        
        updatedList = updatedList.filter(function(note) {
            return note.description
                .toLowerCase()
                .search(e.target.value.toLowerCase()) !== -1;
        });

        this.setState({
            currentNotes: updatedList
        });
    }

    render() {
        if (!this.props.notes) {
            return (
                <div className="loading">Loading...</div>
            );
        }

        return (
            <div>
                <header>
                    <div className="loginout">
                        <a className="login" href="/login">Login</a>
                    </div>
                    
                    <h1><a href="/">Webernote<sup>TM</sup></a></h1>
                    <span>A TodoApp on steroids...</span>

                    <span className="old-versions-nav">
                        Check out <a href="http://anti-code.com/webernote/" target="_blank" rel="noopener noreferrer">v1</a> and <a href="https://github.com/jaredwilli/webernote/tree/angular/" target="_blank" rel="noopener noreferrer">v2</a>!
                    </span>
                </header>
                <div className="wrapper">
                    <nav className="toolbar">
                        <ul>
                            <li><a href="">File</a></li>
                            <li><a href="">Edit</a></li>
                            <li><a href="">View</a></li>
                            <li><a href="">Note</a></li>
                            <li><a href="">Tools</a></li>
                            <li><a href="">Help</a></li>
                            <li className="new-note">
                                <AddNote addNote={(e) => this.addNote(e)} />
                            </li>
                        </ul>
                    </nav>
                    <nav className="note-types">
                        <NoteTypes />
                    </nav>
                    <table id="resizable" className="resizable">
                        <tbody>
                            <tr>
                                <td>
                                    <NoteNav />
                                </td>
                                <td className="middle note-list-col">
                                    <NoteList deleteNote={(note) => this.deleteNote(note)}
                                        filterByNotebook={(notebook) => this.filterByNotebook(notebook)}
                                        filterType={(type) => this.filterType(type)}
                                        filterList={(filter) => this.filterList(filter)} />
                                </td>
                                <td className="edit-note-col">
                                    <EditNote />
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
        selectedNote: state.noteData.selectedNote,
        notebooks: state.notebookData.notebooks,
        tags: state.tagData.tags
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    let actions = Object.assign(noteActions, notebookActions, tagActions);

    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
