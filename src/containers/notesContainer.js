import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NoteNav from '../components/NoteNav';
import NoteTypes from '../components/NoteTypes';

import NoteList from '../components/NoteList';
import EditNote from '../components/EditNote';
import AddNote from '../components/AddNote';

import * as noteActions from '../actions/noteActions';

import '../App.css';

class NotesContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.addNote = this.addNote.bind(this);
        
        this.state = {
            selectedNote: '',
            notes: [],
            username: '',
            user: null
        }
    }
    
    addNote(e) {
        e.preventDefault();

        this.props.actions.resetSelectedNote();
        this.props.actions.addNote();
    }

    render() {
        if (!this.props.notes) {
            return (
                <div className="loading">Loading...</div>
            );
        }

        return (
            <div>
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
        selectedNote: state.noteData.selectedNote,
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
