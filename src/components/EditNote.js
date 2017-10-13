import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as noteActions from '../actions/noteActions';

import NotebooksContainer from '../containers/notebooksContainer';
import TagsContainer from '../containers/tagsContainer';
import LabelsContainer from '../containers/labelsContainer';

import '../styles/edit-note.css';

class EditNote extends React.Component {
    constructor(props) {
        super(props);

        this.editNote = this.editNote.bind(this);
        this.editNotebook = this.editNotebook.bind(this);
        this.editTags = this.editTags.bind(this);
        this.editLabel = this.editLabel.bind(this);

        this.state = {
            selectedNote: (this.props.selectedNote) ? this.props.selectedNote : {}
        };
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

    editLabel(label) {
        let note = this.props.selectedNote;

        this.setState({
            selectedNote: note
        });

        this.props.actions.editNote(note, { label: label });
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
        const selectedNote = this.props.selectedNote;

        if (!selectedNote || !selectedNote.id) {
            return (
                <div className="show-note"></div>
            );
        }

        return (
            <div className="right edit-col edit-note">
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
                            pattern="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?"
                            value={selectedNote.url}
                            onChange={(e) => this.editNote(e)} />

                        <LabelsContainer editLabel={(color) => this.editLabel(color)} />
                    </div>
                    <div className="mid">
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
