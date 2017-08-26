import React from 'react';
import { connect } from 'react-redux';

function formatDate(timeStamp) {
    var date = new Date(timeStamp);
	return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

function Note(props) {
    const notes = props.notes;

    if (!notes) {
        return (
            <div className="note-preview">Loading...</div>
        );
    }
    
    if (notes.length === 0) {
        return (
            <div className="note-preview">
                No notes yet.
            </div>
        );
    }
    
    const note = notes.map((note) =>
        <li className="note" key={note.id} id={note.id} onClick={this.handleClick}>
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
        <ul>
            {note}
        </ul>
    );
};

export default connect(state => {
    note: state.label
 })(Note);
