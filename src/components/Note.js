import React from 'react';
import { connect } from 'react-redux';

function formatDate(timeStamp) {
    var date = new Date(timeStamp);

	return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

function sortNotes(notes) {
    notes.sort((a, b) => {
        return new Date(a.modified_date).getTime() - new Date(b.modified_date).getTime();
    }).reverse();
    
    return notes;
}

function Note(props) {
    const notesRef = props.notes;

    if (!notesRef) {
        return (
            <div className="note">Loading...</div>
        );
    }
    
    if (notesRef.length === 0) {
        return (
            <div className="note">No notes yet.</div>
        );
    }

    const note = sortNotes(notesRef).map((note) =>
        <li className="note" key={note.id} id={note.id} onClick={() => props.selectNote(note)}>
            <button className="delete" onClick={() => props.deleteNote(note)}>X</button>
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

export default connect((state) => state)(Note);
