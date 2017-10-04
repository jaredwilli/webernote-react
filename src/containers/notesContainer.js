import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactLoading from 'react-loading';

import NoteNav from '../components/NoteNav';
import NoteTypes from '../components/NoteTypes';

import NoteList from '../components/NoteList';
import EditNote from '../components/EditNote';
import AddNote from '../components/AddNote';

import { filterData } from '../common/noteHelpers';
import * as noteActions from '../actions/noteActions';

import '../App.css';

class NotesContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.addNote = this.addNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);

        this.filterByNotebook = this.filterByNotebook.bind(this);
        this.filterList = this.filterList.bind(this);
        this.setFilterType = this.setFilterType.bind(this);

        this.state = {
            selectedNote: this.props.selectedNote,
            notebookFilter: {
                name: 'All notebooks',
                id: 'all_notebooks'
            },
            notes: []
        }
    }

    filterByNotebook(notebook) {
        this.props.actions.resetSelectedNote();
        this.setState({
            notebookFilter: notebook
        });
    }

    setFilterType(e) {
        debugger
        let filterType = e.target.name;
        let updatedList = this.state.initialNotes;
        console.log(filterType, updatedList);
    }

    filterList(e) {
        debugger
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

    addNote(e) {
        this.props.actions.resetSelectedNote();
        this.props.actions.addNote();
    }

    deleteNote(note) {
        // this.props.actions.resetSelectedNote();
        this.props.actions.deleteNote(note);
    }

    render() {
        const user = this.props.user;
        let notes = this.props.notes;

        if (!notes) {
            return (
                <div className="big-loader">
                    <ReactLoading className="loader" type="spinningBubbles" color="#ccc" height="500px" width="300px" />
                </div>
            );
        }

        // Filter notes for current user
        notes = filterData(user, notes, {
            notebook: this.state.notebookFilter
        });

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
                                    <NoteList notes={notes}
                                        deleteNote={(note) => this.deleteNote(note)}
                                        filterByNotebook={(notebook) => this.filterByNotebook(notebook)}
                                        filterList={(filter) => this.filterList(filter)}
                                        setFilterType={(type) => this.setFilterType(type)} />
                                </td>
                                <td className="edit-note-col">
                                    <EditNote notes={notes} />
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
        user: state.userData.user,
        notes: state.noteData.notes,
        selectedNote: state.noteData.selectedNote,
        notebooks: state.notebookData.notebooks,
        tags: state.tagData.tags
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(noteActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
