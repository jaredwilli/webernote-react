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

        this.selectNote = this.selectNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);

        this.state = {
            searchTerm: '',
            filterType: ''
        };
    }
    

    selectNote(e, note) {
        if (e.target.className === 'delete') return;

        this.props.actions.resetSelectedNote();
        this.props.actions.selectNote(note);
    }

    deleteNote(id) {
        this.props.actions.deleteNote(id);
        this.props.actions.getNotes();
    }
    
    render() {
        if (!this.props.notes) {
            return (
                <div className="loading">Loading...</div>
            );
        }

        return (
            <div className="note-list">
                <div className="filter">
                    Search type: 
                    <select name="filterType" className="filter-type" 
                        value={this.props.filterType}
                        onChange={(e) => this.props.setFilterType(e)}>
                        <option>Description</option>
                        <option>Title</option>
                        <option>Url</option>
                        <option>Tags</option>
                        <option>Created Date</option>
                        <option>Modified Date</option>
                    </select>

                    <input type="text" name="search" placeholder="Search"
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
                
                <div className="notes">
                    <Note notes={this.props.notes} 
                        selectNote={(e, id) => this.selectNote(e, id)}
                        deleteNote={(id) => this.deleteNote(id)} />
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
