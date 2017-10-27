import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as noteActions from '../actions/noteActions';

import NotebooksContainer from '../containers/notebooksContainer';
import TagsContainer from '../containers/tagsContainer';
import LabelsContainer from '../containers/labelsContainer';

class EditNote extends React.Component {
    constructor(props) {
        super(props);

        this.editNote = this.editNote.bind(this);
        this.editField = this.editField.bind(this);

        this.state = {
            selectedNote: (this.props.selectedNote) ? this.props.selectedNote : {}
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.setBottomHeight);

        if (this.props.selectedNote) {
            this.setBottomHeight();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setBottomHeight);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.selectedNote) {
            this.setBottomHeight();
        }
    }

    setBottomHeight() {
        let containerHeight = document.querySelector('.notes-container').offsetHeight;
        let bottom = document.querySelector('.edit-note .bottom');
        if (bottom) {
            bottom.style.height = containerHeight - bottom.offsetTop - 6 + 'px';
        }
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

    editField(field) {
        this.props.actions.editNote(this.props.selectedNote, field);

        if (field.label) {
            this.props.actions.getNotes();
        }
    }

    render() {
        const selectedNote = this.props.selectedNote;

        if (!selectedNote || !selectedNote.id) {
            return (
                <div className="edit-note"></div>
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
                            editField={(notebook) => this.editField({ notebook: notebook })} />
                    </div>
                    <div className="mid">
                        <input type="url" className="url" name="url" placeholder="http://"
                            pattern="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?"
                            value={selectedNote.url}
                            onChange={(e) => this.editNote(e)} />

                        <LabelsContainer editField={(color) => this.editField({ label: color })} />
                    </div>
                    <div className="mid">
                        <TagsContainer
                            noteTags={selectedNote.tags}
                            editField={(tags) => this.editField({ tags: tags })} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditNote));
