import React, { Component } from 'react';

import '../styles/toolbar.css';

class NoteTypes extends Component {
    render() {
        return (
            <ul>
                <li><a href="#/notes">All Notes</a></li>
                <li><a href="#/notebooks">Notebooks</a></li>
                <li><a href="#/tags">Tags</a></li>
                <li><em>For quick access, drag notes, notebooks and tags here</em></li>
            </ul>
        );
    }
}

export default NoteTypes;
