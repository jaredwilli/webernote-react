import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
        // if (e.target.className === 'delete-note') return;

        this.props.actions.resetSelectedNote();
        this.props.actions.selectNote(note);
    }

    deleteNote(note) {
        this.props.deleteNote(note);
    }

    render() {
        let filtersText = '';

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
            <div className="note-list">
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
