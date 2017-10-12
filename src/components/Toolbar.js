import React, { Component } from 'react';

import AddNote from './AddNote';
import NoteNav from '../components/NoteNav';

class Toolbar extends Component {
    render() {

        return (
            <div>
                <nav className="toolbar">
                    <ul>
                        <NoteNav show="narrow" />

                        <li><a href="">File</a></li>
                        <li><a href="">Edit</a></li>
                        <li><a href="">View</a></li>
                        <li><a href="">Note</a></li>
                        <li><a href="">Tools</a></li>
                        <li><a href="">Help</a></li>
                        <li className="new-note">
                            <AddNote addNote={this.props.addNote} />
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Toolbar;
