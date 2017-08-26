import React, { Component } from 'react';
import firebase from '../firebase.js';

class EditNote extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);

        this.state = {
            title: '',
            notebook: '',
            url: '',
            tags: '',
            description: '',
            created: props.created,
            modified: props.modified
        };
    }

    handleChange(e) {
        console.log(e.target.value);

        // do something to show input for when select value is new notebook
        this.setState({
            [e.target.name]: e.target.value,
            modified_date: new Date().getTime()
        });
    }

    handleOnBlur(e) {
        e.preventDefault();

        const notesRef = firebase.database().ref('notes');
        const note = {
            title: this.state.title,
            notebook: this.state.notebook,
            url: this.state.url,
            tags: this.state.tags,
            description: this.state.description,
            created_date: this.state.created,
            modified_date: this.state.modified
        };
        notesRef.push(note);
    }

    render() {
        return (
            <div id="show-note">
                <form>
                    <div className="top">
                        <input type="text" className="title" name="title" placeholder="Enter title..."  value={this.state.title} onChange={this.handleChange} onBlur={this.handleOnBlur} />
                        <select name="notebook" className="notebook" value={this.state.notebook} onChange={this.handleChange} onBlur={this.handleOnBlur}>
                            <option>My Notebook</option>
                            <option>New Notebook</option>
                        </select>
                        <input type="text" name="notebook" className="new-notebook visuallyhidden" placeholder="Notebook name..." />
                    </div>
                    <div className="mid">
                        <input type="url" className="url" name="url" placeholder="http://" value={this.state.url} onChange={this.handleChange} onBlur={this.handleOnBlur} />
                        <input type="text" className="tag" name="tags" placeholder="Click to add tag..." value={this.state.tags} onChange={this.handleChange} onBlur={this.handleOnBlur} />
                    </div>
                    <textarea className="description" name="description" value={this.state.description} onChange={this.handleChange} onBlur={this.handleOnBlur}></textarea>
                </form>
            </div>
        );
    }
}

export default EditNote;
