import React, { Component } from 'react';
import { connect } from 'react-redux';
import Note from './Note';
import NoteBookContainer from '../containers/notebooks.js';

class NoteList extends Component {
    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);

        this.state = {
            notes: this.props.notes,
            notebooks: 'My Notebook'
        };
    }

    handleSearch(text) {
        // search seems to be able to be controlled by the type of search you want to do
    }
    
    componentWillReceiveProps(nextProps) {
        // this.setState({
        //     notes: nextProps.note
        // });
    }
    
    render() {
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
                    <NoteBookContainer notebook="My Notebook" canAddNotebook={false} />
                </div>
                
                <div id="notes">
                    <Note notes={this.props.notes} 
                        selectNote={(selectedNote) => this.props.onSelectNote(selectedNote)}
                        deleteNote={this.props.onDeleteNote} />
                </div>
            </div>
        );
    }
}

export default connect((state) => state)(NoteList);
