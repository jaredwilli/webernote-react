import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CloseBtn from './stateless/CloseBtn';
import TagsList from './TagsList';

import { formatDate, shorten } from '../common/helpers';
import { sortNotes } from '../common/noteHelpers';

const Note = ({ notes = [], match, isMobile = false, ...props }) => {
    if (!notes.length) {
        return <div className="empty"></div>;
    }

    const note = sortNotes(notes).map(note =>
        <li className={ (note.isEditing) ? 'note selected' : 'note' }
            key={note.id} id={note.id}
            onClick={() => props.selectNote(note)}>

            {!isMobile && <CloseBtn onClick={() => props.deleteNote(note)} />}
            {(isMobile && note.url) && <a href={ note.url } className="external-link" target="_blank"><FontAwesome name='external-link' /></a>}

            {note.label && <div className="note-label" style={{ background: note.label.hex }}></div>}

            {note.title && <h2 className="title">
                {(!isMobile && note.url) &&
                    <a href={ note.url } target="_blank">
                        {shorten(note.title, 80)}
                    </a>
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
                            <Link to={`${match.path}/${note.notebook.name}`}>
                                { note.notebook.name }
                            </Link>
                        </span>
                    }
                    <TagsList tags={ note.tags } />
                </div>
            </div>
        </li>
    );

    return <div className="notes"><ul>{ note }</ul></div>;
};

Note.propTypes = {
    match: PropTypes.object,
    notes: PropTypes.array,
    isMobile: PropTypes.bool,
    deleteNote: PropTypes.func,
    selectNote: PropTypes.func,
};

export default Note;
