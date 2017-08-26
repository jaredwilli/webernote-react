import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Note from './Note.js';

function formatDate(timeStamp) {
    var date = new Date(timeStamp);
	return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

function Note(props) {
    const notesRef = props.notes;


    if (!notesRef || notesRef.inProgress) {
        return (
            <div className="note-preview">Loading...</div>
        );
    }
    
    if (notesRef.success && notesRef.length === 0) {
        return (
            <div className="note-preview">
                No notes yet.
            </div>
        );
    }
    
    const note = notesRef.notes.map((note) =>
        <li className="note" key={note.id} id={note.id}>
            <button className="delete">X</button>
            <h2 className="title">{note.title}</h2>
            <p>
                <span className="date">{formatDate(note.modified_date)}</span>
                <span className="tag-item">{note.tags}</span>
                <span className="description">{note.description}</span>
            </p>
        </li>
    );

    return (
        <ul>{note}</ul>
    );
};

class NoteList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notebook: ''
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id="note-list">
                <div className="filter">
                    <a href>Notes created by</a>
                    <input type="text" name="search" placeholder="Search" />
                </div>
                <div className="viewing">
                    <span className="viewtext">
                        Viewing <span className="count">0</span> notes from
                    </span>
                    <select name="notebook" className="notebook" value={this.state.notebook}>
                        <option>My Notebook</option>
                    </select>
                </div>
                
                <div id="notes">
                    <Note notes={this.props.notes} />
                </div>
            </div>
        );
    }
}

export default NoteList;
