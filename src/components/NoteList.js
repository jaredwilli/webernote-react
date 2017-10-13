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
        this.props.actions.resetSelectedNote();
        this.props.actions.selectNote(note);
    }

    deleteNote(note) {
        this.props.deleteNote(note);
    }

    render() {
        if (!this.props.notes.length) {
            return (
                <div className="zero-notes">
                    <div className="welcome-msg">
                        <h2>Welcome to Webernote!</h2>
                        <sub>A real-time data syncing application</sub>
                        <p>Webernote allows you to create notes and store them instantly in real time. There are various ways to organize your notes. Currently you are able to:</p>

                        <ul>
                            <li>create, edit, and delete notes</li>
                            <li>create notebooks and add notes to them</li>
                            <li>select or use a custom colored label to color-code your notes</li>
                            <li>create and select custom tags to assign to notes</li>
                            <li>Plus, mobile-friendly design allows you to take notes anywhere!!</li>
                        </ul>

                        <p>Making changes to your notes is a snap. Everything is instantly saved as you do it. <br/> You don't have to create an account to try it out, just click the Add Note button. Later if you choose to keep using the app login with your Facebook account. Everything you've added will be added to your user account.</p>

                        <div className="get-started">
                            <button onClick={this.props.addNote} className="get-started-btn">
                                <i className="fa fa-file-text"></i>
                                Create A New Note
                            </button>

                            <button onClick={this.props.login} className="fbBlue get-started-btn">
                                <i className="fa fa-facebook"></i>
                                Login With Facebook
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        let filtersText = '';

        if (this.props.notes.length) {
            filtersText = (
                <div className="filters">
                    <div className="filter hidden">
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
                    {(this.props.notebooks && this.props.notebooks.length) ?
                        <div className="viewing">
                            <span className="viewtext">
                                Viewing <span className="count">{this.props.notes.length}</span> notes from
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

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
