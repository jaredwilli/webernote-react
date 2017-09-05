import React from 'react';

function AddNote(props) {
    return (
        <button id="newNote" onClick={(e) => props.addNote(e)}>
            <span className="plus">+</span>
            Add Note
        </button>
    );
}

export default AddNote;
