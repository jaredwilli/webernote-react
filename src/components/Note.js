import React from 'react';
import FontAwesome from 'react-fontawesome';

import CloseBtn from './stateless/CloseBtn';
import TagsList from './TagsList';

import { formatDate, shorten } from '../common/helpers';
import { sortNotes } from '../common/noteHelpers';

const Note = ({ notes = [], isMobile = false, ...props }) => {
    if (!notes.length) {
        return <div className="empty"></div>;
    }

    const note = sortNotes(notes).map(note =>
        <li className={(note.isEditing) ? 'note selected' : 'note'}
            key={note.id} id={note.id}
            onClick={(e) => props.selectNote(note)}>

            {!isMobile && <CloseBtn onClick={(e) => props.deleteNote(note)} />}
            {(isMobile && note.url) && <a className="external-link" href={note.url} target="_blank"><FontAwesome name='external-link' /></a>}

            {note.label && <div className="note-label" style={{ background: note.label.hex }}></div>}

            {note.title && <h2 className="title">
                {(!isMobile && note.url) &&
                    <a href={note.url} target="_blank">{shorten(note.title, 80)}</a>
                }
                {(!isMobile && !note.url) && shorten(note.title, 80)}
                {(isMobile) && shorten(note.title, 80)}
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
                    <TagsList tags={note.tags} />
                </div>
            </div>
        </li>
    );

    return <div className="notes"><ul>{note}</ul></div>;
};

export default Note;
