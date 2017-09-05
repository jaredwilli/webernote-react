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

        this.getNote = this.getNote.bind(this);
        this.filterList = this.filterList.bind(this);
        this.setFilterType = this.setFilterType.bind(this);
        this.filterByNotebook = this.filterByNotebook.bind(this);

        this.state = {
            searchTerm: '',
            filterType: '',
            notes: this.props.notes,
            currentNotes: this.props.notes,
            selectedNote: this.props.selectedNote
        };
    }
    
    getInitialState() {
        return {
            currentNotes: this.props.notes,
            notes: []
        }
    }

    componentWillMount() {
        this.setState({
            notes: this.state.initialNotes
        });
    }

    filterByNotebook(e) {
        let filterNotebook = e.target.value
    }

    setFilterType(e) {
        let filterType = e.target.name;
        let updatedList = this.state.initialNotes;
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
                    Search type: 
                    <select name="filterType" className="filter-type" 
                        value={this.props.filterType}
                        onChange={(e) => this.setFilterType(e)}>
                        <option>Description</option>
                        <option>Title</option>
                        <option>Url</option>
                        <option>Tags</option>
                        <option>Created Date</option>
                        <option>Modified Date</option>
                    </select>

                    <input type="text" name="search" placeholder="Search"
                        onChange={(e) => this.filterList(e)} />
                </div>
                <div className="viewing">
                    <span className="viewtext">
                        Viewing <span className="count">{this.props.notes.length}</span> notes from
                    </span>
                    
                    <NotebookContainer selectNotebook={(e) => this.filterByNotebook(e)} />
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
        notes: state.noteData.notes,
        notebooks: state.notebookData.notebooks,
        selectedNote: state.noteData.selectedNote
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
