import React, { Component } from 'react';
import Notes from './Notes.js';

class NoteList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notebook: ''
        };
    }

    render() {
        return (
            <div id="note-list">
                <div className="filter">
                    <a href>Notes created by</a>
                    <input type="text" name="search" placeholder="Search" />
                </div>
                <div className="viewing">
                    <span className="viewtext">
                        Viewing <span className="count">0</span> notes from
                    </span>
                    <select name="notebook" className="notebook" value={this.state.notebook}>
                        <option>My Notebook</option>
                    </select>
                </div>
                
                <Notes />
            </div>
        );
    }
}

export default NoteList;
