import React from 'react';

import { formatDate, shorten } from '../common/helpers';
import { sortNotes, getTags } from '../common/noteHelpers';

function Note(props) {
    const notes = props.notes;

    if (!notes) {
        return (
            <div className="note loading">Loading...</div>
        );
    }

    if (notes.length === 0) {
        return (
            <div className="note"></div>
        );
    }

    const note = sortNotes(notes).map((note) =>
        <li className={(note.isEditing) ? 'note selected' : 'note'}
            key={note.id} id={note.id}
            onClick={(e) => props.selectNote(e, note)}>
            <span className="remove delete-note Select-clear"
                onClick={() => props.deleteNote(note)}>×
            </span>
            {note.label ? <div className="note-label" style={{background: note.label.hex}}></div> : ''}
            {note.title ? <h2 className="title">{shorten(note.title, 80)}</h2> : ''}
            <div className="note-details">
                <span className="date">
                    {formatDate((note.modified_date) ? note.modified_date : note.created_date)}
                </span>
                <span className="description">{shorten(note.description, 250)}</span>
                {getTags(note.tags)}
            </div>
        </li>
    );

    return (
        <ul>{note}</ul>
    );
};

export default Note;
