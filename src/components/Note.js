import React from 'react';
import { formatDate, sortNotes, getTags } from '../common/helpers';

function Note(props) {
    const notes = props.notes;

    if (!notes) {
        return (
            <div className="note loading">Loading...</div>
        );
    }
    
    if (notes.length === 0) {
        return (
            <div className="note">No notes yet.</div>
        );
    }
    
    const note = sortNotes(notes).map((note) => 
        <li className={(note.isEditing) ? 'note selected' : 'note'} 
            key={note.id} id={note.id} 
            onClick={(e) => props.selectNote(e, note)}>
            <button className="delete" onClick={() => props.deleteNote(note.id)}>X</button>
            <h2 className="title">{note.title}</h2>
            <p>
                <span className="date">
                    {formatDate((note.modified_date) ? note.modified_date : note.created_date)}
                </span>
                <span className="tag-item">{getTags(note.tags)}</span>
                <span className="description">{note.description}</span>
            </p>
        </li>
    );

    return (
        <ul>{note}</ul>
    );
};

export default Note;
