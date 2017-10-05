import React from 'react';

function AddNote(props) {
    return (
        <button id="newNote" className="newNote" onClick={(e) => props.addNote(e)}>
            Add Note
            <span className="plus">+</span>
        </button>
    );
}

export default AddNote;
