import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as noteActions from '../actions/noteActions';
// import * as notebookActions from '../actions/notebookActions';

import NotebookContainer from '../containers/notebooksContainer';
import Note from './Note';

class NoteList extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSearch = this.handleSearch.bind(this);
        this.getNote = this.getNote.bind(this);

        this.state = {
            selectedNote: ''
        };
    }
    
    handleSearch(text) {
        // search seems to be able to be controlled by the type of search you want to do
    }

    getNote(e, id) {
        if (e.target.className === 'delete') return;
        this.props.getNote(id);
    }
    
    render() {
        if (!this.props.notes) {
            return (
                <div className="loading">Loading...</div>
            );
        }

        return (
            <div id="note-list">
                <div className="filter">
                    <a href>Notes created by</a>
                    <input type="text" name="search" placeholder="Search"
                        onChange={(text) => this.handleSearch(text)} />
                </div>
                <div className="viewing">
                    <span className="viewtext">
                        Viewing <span className="count">{this.props.notes.length}</span> notes from
                    </span>
                    <NotebookContainer notebook="My Notebook" canAddNotebook={false} />
                </div>
                
                <div id="notes">
                    <Note notes={this.props.notes} 
                        getNote={(e, id) => this.getNote(e, id)}
                        deleteNote={(id) => this.props.deleteNote(id)} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        notes: state.noteData.notes
    };
    console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(noteActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
