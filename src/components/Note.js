import React from 'react';
import FontAwesome from 'react-fontawesome';

import CloseBtn from './stateless/CloseBtn';
import TagsList from './TagsList';

import { formatDate, shorten } from '../common/helpers';
import { sortNotes } from '../common/noteHelpers';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// using some little inline style helpers to make the app look okay
const grid = 8;
export const getItemStyle = (draggableStyle, isDragging) => ({
	// some basic styles to make the notes look a bit nicer
	padding: grid * 2,
	margin: `0 0 ${grid}px 0`,
	background: isDragging ? 'lightgreen' : 'white',
	...draggableStyle
});

export const getListStyle = isDraggingOver => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: '100%'
});

const Note = ({ notes = [], isMobile = false, ...props }) => {
    if (!notes.length) {
        return <div className="empty"></div>;
    }

    /* const note = sortNotes(notes).map(note =>
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
    ); */

    const noteItems = notes.map(note => (
        <Draggable key={note.id} draggableId={note.id}>
            {(provided, snapshot) => (
                <div>
                    <div ref={provided.innerRef}
                        style={getItemStyle(provided.draggableStyle, snapshot.isDragging)}
                        {...provided.dragHandleProps}>

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
                    </div>

                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    ));

    return (
        <div className="notes">
            <DragDropContext onDragEnd={props.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>

                            {noteItems}

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Note;
