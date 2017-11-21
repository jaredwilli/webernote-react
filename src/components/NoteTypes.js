import React from 'react';
import { Link } from 'react-router-dom';

// import SearchFilter from './SearchFilter';

const NoteTypes = () => {
    return (
        <nav className="note-types">
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

                {/* <SearchFilter /> */}
            </div>
        </nav>
    );
}

export default NoteTypes;
