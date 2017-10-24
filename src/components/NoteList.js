import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as noteActions from '../actions/noteActions';

import NotebookContainer from '../containers/notebooksContainer';
import WelcomeMsg from './WelcomeMsg';
import Note from './Note';

import Notebooks from './Notebooks';
import Tags from './Tags';
import Labels from './Labels';

import '../styles/note-list.css';

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

    filterNotes(filter) {
        filter = filter.target.value

        if (filter) {
            this.setState({

            });
        }
    }

    // Type of field to filter on from dropdown
	setFilterType(e) {
        let type = e.target.value;

        this.setState({
            filterType: type
        }, () => {
            this.props.filterNotes({ type });
        });
    }

    // Search keyword to look for in the field from filterType
	filterList(e) {
		let term = e.target.value;

        if (term) {
            this.setState({
                searchTerm: term
            }, () => {
                this.props.actions.filterNotes({
                    type: this.state.filterType,
                    term: term
                });
            });
        }
    }

    // Notebook to filter by
    filterByNotebook(notebook) {
		this.setState({
			notebookFilter: notebook
		}, () => {
            this.props.filterNotes({ notebook });
        });
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
                    login={this.props.login} />
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
                            onChange={(e) => this.filterNotes(e)}>
                            <option>Title</option>
                            <option>Description</option>
                            <option>Url</option>
                        </select>

                        <input type="text" name="search" placeholder="Search" className="search"
                            value={this.state.searchTerm}
                            onChange={(e) => this.filterNotes(e)} />

                        <span className="remove clear-filters Select-clear"
                            onClick={() => this.filterNotes('clear')}>×
                        </span>
                    </div>
                    {(notebooks) ?
                        <div className="viewing">
                            <span className="viewtext">
                                Viewing <span className="count">{notes.length}</span> notes from
                            </span>
                            <NotebookContainer
                                filterByNotebook={(e) => this.filterNotes(e)}
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

/* <Route path="/" component={Note} />
                <Route path="/notebooks/:notebookName" component={Notebooks} />
                <Route path="/tags/:tagValue" component={Tags} />
                <Route path="/labels/:labelName" component={Labels} /> */
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
