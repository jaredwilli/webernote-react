import React, { Component } from 'react';
import { connect } from 'react-redux';
// import firebase from '../firebase.js';

class AddNote extends Component {
    constructor() {
        super();

        this.state = {
            note: {
                title: 'Untitled note...',
                notebook: '',
                url: '',
                tags: '',
                description: '',
                created_date: new Date().getTime(),
                modified_date: new Date().getTime()
            }
        };
    }

    componentWillMount() {

        // this.props.onAddNote();
    }

    render() {
        return (
            <button id="newNote" >
                <span className="plus">+</span>
                Add Note
            </button>
        );
    }
}

AddNote = connect()(AddNote);
export default AddNote;
