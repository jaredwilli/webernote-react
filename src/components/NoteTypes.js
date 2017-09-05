import React, { Component } from 'react';

class NoteTypes extends Component {
    render() {
        return (
            <ul>
                <li><a href="#">All Notes</a></li>
                <li><a href="#">Notebooks</a></li>
                <li><a href="#">Tags</a></li>
                <li><em>For quick access, drag notes, notebooks and tags here</em></li>
            </ul>
        );
    }
}

export default NoteTypes;
