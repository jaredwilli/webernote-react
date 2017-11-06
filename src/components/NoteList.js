import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NotebookContainer from '../containers/notebooksContainer';
import WelcomeMsg from './WelcomeMsg';
import CloseBtn from './ui/CloseBtn';
import Note from './Note';

import * as noteActions from '../actions/noteActions';

// import Notebooks from './Notebooks';
// import Tags from './Tags';
// import Labels from './Labels';

class NoteList extends Component {
    constructor(props, context) {
        super(props, context);

        this.selectNote = this.selectNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);

        this.state = {
            filterType: 'Title',
            searchTerm: '',
			notebookFilter: {
				name: 'All notebooks',
				id: 'all_notebooks'
			}
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

    filterNotes(filter) {
        if (filter) {
            this.setState(filter, () => {
                let filterVals = {};

                if (filter.filterType || filter.searchTerm) {
                    filterVals.type = this.state.filterType;
                    filterVals.term = filter.searchTerm;
                } else if (filter.notebookFilter) {
                    filterVals.notebook = filter.notebookFilter;
                }

                this.props.filterNotes(filterVals);
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

        if (!notes.length) {
            return (
                <WelcomeMsg addNote={this.props.addNote}
                    showLoginModal={this.props.showLoginModal} />
            );
        }

        let filtersText = '';

        if (notes.length) {
            filtersText = (
                <div className="filters">
                    <div className="filter">
                        <label>Search type:</label>
                        <select name="filterType" className="filter-type"
                            value={this.state.filterType}
                            onChange={(e) => this.filterNotes({ filterType: e.target.value })}>
                            <option>Title</option>
                            <option>Description</option>
                            <option>Url</option>
                        </select>

                        <input type="text" name="search" placeholder="Search" className="search"
                            value={this.state.searchTerm}
                            onChange={(e) => this.filterNotes((e.target.value.length) ? { searchTerm: e.target.value } : undefined)} />

                        <CloseBtn onClick={() => this.filterNotes()} />
                    </div>
                    {(notebooks) ?
                        <div className="viewing">
                            <span className="viewtext">
                                Viewing <span className="count">{notes.length}</span> notes from
                            </span>
                            <NotebookContainer
                                filterByNotebook={(e) => this.filterNotes({ notebookFilter: e.name })}
                                canAddNotebook={false} />
                        </div>
                    : ''}
                </div>
            );
        }

        return (
            <div className="middle list-col note-list">
                {filtersText}

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
