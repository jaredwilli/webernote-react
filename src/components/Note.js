import React from 'react';
import FontAwesome from 'react-fontawesome';

import CloseBtn from './ui/CloseBtn';

import { formatDate, shorten } from '../common/helpers';
import { sortNotes, getTags } from '../common/noteHelpers';

function Note(props) {
    const { notes } = props;

    if (notes.length === 0) {
        return (
            <div className="note"></div>
        );
    }

    const note = sortNotes(notes).map((note) =>
        <li className={(note.isEditing) ? 'note selected' : 'note'}
            key={note.id} id={note.id}
            onClick={(e) => props.selectNote(e, note)}>
            <CloseBtn onClick={() => props.deleteNote(note)} />
            {note.label && <div className="note-label" style={{ background: note.label.hex }}></div>}
            {note.title && <h2 className="title">
                {note.url && <a href={note.url} target="_blank">{shorten(note.title, 80)}</a>}
                {!note.url && shorten(note.title, 80)}
            </h2>}
            <div className="note-details">
                <span className="date">
                    {formatDate((note.modified_date) ? note.modified_date : note.created_date)}
                </span>
                <span className="description">{shorten(note.description, 250)}</span>
                <div className="taxonomies">
                    {(note.notebook && note.notebook.name) &&
                        <span className="notebook">
                            <FontAwesome name='book' />
                            <a href>{note.notebook.name}</a>
                        </span>
                    }
                    {getTags(note.tags)}
                </div>
            </div>
        </li>
    );

    return (
        <ul>{note}</ul>
    );
};

export default Note;
