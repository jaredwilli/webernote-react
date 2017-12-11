import React from 'react';
import PropTypes from 'prop-types';
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

AddNote.propTypes = {
    addNote: PropTypes.func.isRequired
};

export default AddNote;
