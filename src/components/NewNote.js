import React, { Component } from 'react';
import firebase from '../firebase.js';

class NewNote extends Component {
    constructor(props) {
        super(props);
        this.addNote = this.addNote.bind(this);
    }

    addNote(e) {
        e.preventDefault();
        const notesRef = firebase.database().ref('notes');
        const note = {
            title: 'Untitled note...',
            notebook: '',
            url: '',
            tags: '',
            description: '',
            created_date: new Date().getTime(),
            modified_date: new Date().getTime()
        };
        notesRef.push(note);
    }
    
    render() {
        return (
            <button id="newNote" onClick={this.addNote}>
                <span className="plus">+</span>
                New Note
            </button>
        );
    }
}

export default NewNote;
