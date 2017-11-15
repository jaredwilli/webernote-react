import React from 'react';

function AddNote(props) {
    return (
        <button className="new-note" onClick={props.addNote}>
            Add Note
            <span className="plus">+</span>
        </button>
    );
}

export default AddNote;
