import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as noteActions from '../actions/noteActions';

import NotebooksContainer from '../containers/notebooksContainer';
import TagsContainer from '../containers/tagsContainer';

import { TwitterPicker } from 'react-color';

import '../styles/edit-note.css';

class EditNote extends React.Component {
    constructor(props) {
        super(props);

        this.editNote = this.editNote.bind(this);
        this.editLabel = this.editLabel.bind(this);
        this.editNotebook = this.editNotebook.bind(this);
        this.editTags = this.editTags.bind(this);
        this.showColorPicker = this.showColorPicker.bind(this);

        this.state = {
            selectedNote: (this.props.selectedNote) ? this.props.selectedNote : {},
            showColorPicker: false
        };
    }

    showColorPicker(e) {
        e.preventDefault();
        this.setState({
            showColorPicker: true
        });
    }

    editNote(e) {
        let note = this.props.selectedNote;

        note[e.target.name] = e.target.value;
        note.modified_date = new Date().getTime();

        this.setState({
            selectedNote: note
        });

        this.props.actions.editNote(note);
        this.props.actions.getNotes();
    }

    editLabel(color) {
        let note = this.props.selectedNote;

        note.label = color.hex;
        note.modified_date = new Date().getTime();

        this.setState({
            selectedNote: note,
            showColorPicker: false
        });

        this.props.actions.editNote(note);
        this.props.actions.getNotes();
    }

    editNotebook(notebook) {
        let note = this.props.selectedNote;

        this.setState({
            selectedNote: note
        });

        this.props.actions.editNote(note, { notebook: notebook });
    }

    editTags(tags) {
        let note = this.props.selectedNote;

        this.setState({
            selectedNote: note
        });


        this.props.actions.editNote(note, { tags: tags });
    }

    render() {
        // get the selectedNote from props
        const selectedNote = this.props.selectedNote;
        const colors = [
            '#FF6900', '#FF9800', '#FCB900',
            '#009688', '#00D084', '#7BDCB5',
            '#03A9F4', '#00BCD4', '#8ED1FC',
            '#880E4F', '#E91E63', '#F78DA7',
            '#673AB7', '#9900EF', '#9C27B0',
            '#ABB8C3'
        ];
        let colorPicker = '';

        if (!selectedNote || !selectedNote.id) {
            return (
                <div className="show-note"></div>
            );
        }

        if (this.state.showColorPicker) {
            colorPicker = (
                <div className="label-color-picker">
                    <TwitterPicker color={this.state.background}
                        onChangeComplete={this.editLabel}
                        colors={colors}
                        triangle="top-right" />
                </div>
            );
        }

        return (
            <div className="edit-note">
                <form>
                    <div className="top">
                        <input type="text" className="title" name="title" placeholder="Enter title..."
                            value={selectedNote.title}
                            autoFocus={true}
                            onChange={(e) => this.editNote(e)} />
                        <NotebooksContainer
                            canAddNotebook={true}
                            editNotebook={(notebook) => this.editNotebook(notebook)} />
                    </div>
                    <div className="mid">
                        <input type="url" className="url" name="url" placeholder="http://"
                            value={selectedNote.url}
                            onChange={(e) => this.editNote(e)} />

                        <div className="label-picker">
                            <label onClick={this.showColorPicker}>Label</label>
                            <button className="label-background"
                                style={{backgroundColor: selectedNote.label}}
                                onClick={this.showColorPicker}>
                            </button>
                            {colorPicker}
                        </div>

                        <TagsContainer
                            noteTags={selectedNote.tags}
                            editTags={(tags) => this.editTags(tags)} />
                    </div>
                    <div className="bottom">
                        <textarea className="description" name="description"
                            value={selectedNote.description}
                            onChange={(e) => this.editNote(e)}>
                        </textarea>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        selectedNote: state.noteData.selectedNote
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(noteActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
