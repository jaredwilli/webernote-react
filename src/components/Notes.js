import React, { Component } from 'react';
//import Note from './Note.js';
import firebase from '../firebase.js';

function formatDate(timeStamp) {
    var date = new Date(timeStamp);
	return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

class Notes extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        
        this.state = {
            notes: []
        };
    }

    componentDidMount() {
        const notesRef = firebase.database().ref('notes');
        
        notesRef.on('value', (snapshot) => {
            let notes = snapshot.val();
            let newState = [];

            for (let note in notes) {
                newState.push({
                    id: note,
                    title: notes[note].title,
                    notebook: notes[note].notebook,
                    url: notes[note].url,
                    tags: notes[note].tags,
                    description: notes[note].description,
                    created_date: notes[note].created_date,
                    modified_date: notes[note].modified_date
                });
            }

            this.setState({
                notes: newState
            });
        });
    }

    handleClick(e) {
        console.log(e.target.id);
        // this.props.onNoteSelected(e.target);
    }

    render() {
        return (
            <div id="notes">
                <ul>
                    {this.state.notes.map((note) => {
                        return (
                            <li className="note" key={note.id} id={note.id} onClick={this.handleClick}>
                                <button className="delete">X</button>
                                <h2 className="title">{note.title}</h2>
                                <p>
                                    <span className="date">{formatDate(note.modified_date)}</span>
                                    <span className="tag-item">{note.tags}</span>
                                    <span className="description">{note.description}</span>
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default Notes;
