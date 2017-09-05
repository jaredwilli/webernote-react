import React from 'react';
import { formatDate, sortNotes } from '../common/helpers';

function Note(props) {
    const notesRef = props.notes;

    if (!notesRef) {
        return (
            <div className="note loading">Loading...</div>
        );
    }
    
    if (notesRef.length === 0) {
        return (
            <div className="note">No notes yet.</div>
        );
    }

    const note = sortNotes(notesRef).map((note) => 
        <li className={(note.isEditing) ? 'note selected' : 'note'} 
            key={note.id} id={note.id} 
            onClick={(e) => props.getNote(e, note.id)}>

            <button className="delete" onClick={() => props.deleteNote(note.id)}>X</button>
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

export default Note;
