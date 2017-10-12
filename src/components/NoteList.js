import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';

import * as noteActions from '../actions/noteActions';

import NotebookContainer from '../containers/notebooksContainer';
import Note from './Note';

import '../styles/note-list.css';

class NoteList extends Component {
    constructor(props, context) {
        super(props, context);

        this.selectNote = this.selectNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);

        this.state = {
            searchTerm: '',
            filterType: ''
        };
    }

    selectNote(e, note) {
        this.props.actions.resetSelectedNote();
        this.props.actions.selectNote(note);
    }

    deleteNote(note) {
        this.props.deleteNote(note);
    }

    render() {
        let filtersText = '';

        if (!this.props.notes.length) {
            return (
                <div className="zero-notes">
                    <div className="welcome-msg">
                        <h2>Welcome to Webernote!</h2>
                        <p>An app where you can keep the things you don't want to forget about. With Webernote you can create and manage notes, and organize them by creating notebooks, tags, and labeling them by different colors.</p>

                        <p>All data is instantly saved as you type and make changes. A real Real-Time application.</p>

                        <div className="get-started">
                            <button onClick={this.props.addNote} className="get-started-btn">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        if (this.props.notes.length) {
            filtersText = (
                <div className="filters">
                    <div className="filter">
                        Search type:
                        <select name="filterType" className="filter-type"
                            value={this.props.filterType || 'Title'}
                            onChange={(e) => this.props.setFilterType(e)}>
                            <option>Title</option>
                            <option>Description</option>
                            <option>Url</option>
                            <option>Label</option>
                            <option>Tags</option>
                            <option>Created Date</option>
                            <option>Modified Date</option>
                        </select>

                        <input type="text" name="search" placeholder="Search" className="search"
                            value={this.props.search}
                            onChange={(e) => this.props.filterList(e)} />
                    </div>
                    <div className="viewing">
                        <span className="viewtext">
                            Viewing <span className="count">{this.props.notes.length}</span> notes from
                        </span>
                        <NotebookContainer
                            filterByNotebook={(e) => this.props.filterByNotebook(e)}
                            canAddNotebook={false} />
                    </div>
                </div>
            );
        }

        return (
            <div className="middle list-col note-list">
                {filtersText}

                <div className="notes">
                    <Note notes={this.props.notes}
                        selectNote={(e, note) => this.selectNote(e, note)}
                        deleteNote={(note) => this.deleteNote(note)} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        // user: state.userData.user,
        // notes: state.noteData.notes,
        notebooks: state.notebookData.notebooks,
        // // selectedNote: state.noteData.selectedNote,
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

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
