import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NotebookContainer from '../containers/notebooksContainer';

import FilterSearch from './FilterSearch';
import FilterByNotebook from './FilterByNotebook';

import Note from './Note';

import * as noteActions from '../actions/noteActions';

class NoteList extends Component {
    constructor(props, context) {
        super(props, context);

        this.selectNote = this.selectNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.filterNotes = this.filterNotes.bind(this);
        this.clearFilters = this.clearFilters.bind(this);

        this.state = {
            filterType: 'Title',
            searchTerm: '',
			notebookFilter: ''
        };
    }

    clearFilters() {
        this.setState({
            filterType: 'Title',
            searchTerm: '',
            notebookFilter: {
                name: 'All notebooks',
                id: 'all_notebooks'
            }
        }, () => this.props.filterNotes());
    }

    // TODO: refactor this to be a pure function
    filterNotes(filter) {
        debugger;
        if (filter) {
            this.setState(filter, () => {
                if (filter.filterType || filter.searchTerm) {
                    this.props.filterNotes({
                        type: this.state.filterType,
                        term: filter.searchTerm
                    });
                } else if (filter.notebookFilter) {
                    this.props.filterNotes({
                        notebook: filter.notebookFilter
                    });
                }

            });
        } else {
            this.clearFilters();
        }
    }

    selectNote(e, note) {
        this.props.actions.resetSelectedNote();
        this.props.actions.selectNote(note);
    }

    deleteNote(note) {
        this.props.deleteNote(note);
    }

    render() {
        let { notes, notebooks } = this.props;

        return (
            <div className="middle list-col note-list">
                <FilterSearch
                    filterType={this.state.filterType}
                    searchTerm={this.state.searchTerm}
                    filterNotes={this.filterNotes}
                    clearFilters={this.clearFilters} />

                <FilterByNotebook
                    notebookFilter={this.state.notebookFilter}
                    notebooks={notebooks}
                    count={this.props.notes.length}
                    filterNotes={this.filterNotes} />

                <div className="notes">
                    <Note notes={notes}
                        selectNote={(e, note) => this.selectNote(e, note)}
                        deleteNote={(note) => this.deleteNote(note)} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteList));
