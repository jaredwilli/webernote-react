import React from 'react';
import Button from './stateless/Button';

const AddNote = ({ props }) => {
    return (
        <Button
            id="newNote"
            className="newNote"
            onClick={(event) => props.addNote(event)}
            {...props}>
            Add Note
            <span className="plus">+</span>
        </Button>
    );
}

export default AddNote;
