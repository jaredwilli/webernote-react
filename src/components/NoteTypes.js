import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../styles/note-types.css';

class NoteTypes extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/notes">All Notes</Link>
                    </li>
                    <li>
                        <Link to="/notebooks">Notebooks</Link>
                    </li>
                    <li>
                        <Link to="/tags">Tags</Link>
                    </li>
                </ul>

                <div className="quick-access dropzone">
                    <em>For quick access, drag notes, notebooks and tags here</em>
                </div>
            </div>
        );
    }
}

export default NoteTypes;
