import React, { Component } from 'react';

import '../styles/toolbar.css';

class NoteTypes extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><a href="/notes">All Notes</a></li>
                    <li><a href="/notebooks">Notebooks</a></li>
                    <li><a href="/tags">Tags</a></li>
                </ul>

                <div className="quick-access dropzone">
                    <em>For quick access, drag notes, notebooks and tags here</em>
                </div>
            </div>
        );
    }
}

export default NoteTypes;
