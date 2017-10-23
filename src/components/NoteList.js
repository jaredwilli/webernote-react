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
        let { notes, notebooks, labels, tags } = this.props;

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
                    {(notebooks && notebooks.length) ?
                        <div className="viewing">
                            <span className="viewtext">
                                Viewing <span className="count">{notes.length}</span> notes from
                            </span>
                            <NotebookContainer
                                filterByNotebook={(e) => this.props.filterByNotebook(e)}
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
