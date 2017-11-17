import React from 'react';
import Button from './stateless/Button';

function AddNote(props) {
    return (
        <Button
            id="newNote"
            className="newNote"
            onClick={props.addNote}>
            Add Note
            <span className="plus">+</span>
        </Button>
    );
}

export default AddNote;
