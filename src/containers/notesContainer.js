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
    isEditing: true,
    created_date: new Date().getTime(),
    modified_date: ''
};

class NotesContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.addNote = this.addNote.bind(this);
    }
    
    addNote(e) {
        e.preventDefault();

        this.props.actions.resetSelectedNote();
        this.props.actions.addNote(newNote);
    }

    render() {
        if (!this.props.notes) {
            return (
                <div className="loading">Loading...</div>
            );
        }

        // <div class="loginout">
        //     <a class="login" href="">Login</a>
        // </div>
        return (
            <div>
                <header>
                    <h1><a href="/">Webernote<sup>TM</sup></a></h1>

                    <span className="old-versions-nav">
                        Check out <a href="http://anti-code.com/webernote/" target="_blank">v1</a> and <a href="https://github.com/jaredwilli/webernote/tree/angular/" target="_blank">v2</a>!
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
                                    <NoteList />
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
        notebooks: state.notebookData.notebooks,
        tags: state.tagData.tags
    };
    console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(noteActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
