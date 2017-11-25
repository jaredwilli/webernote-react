import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Input from './stateless/Input';
import Textarea from './stateless/Textarea';

import NotebookSelect from './NotebookSelect';
import TagsInput from './TagsInput';
import LabelPicker from './LabelPicker';

import * as noteActions from '../actions/noteActions';

class EditNote extends React.Component {
    constructor(props) {
        super(props);

        this.editNote = this.editNote.bind(this);
        this.editField = this.editField.bind(this);
        this.deleteNoteLabel = this.deleteNoteLabel.bind(this);

        this.state = {
            label: {},
            tags: [],
            notebook: {
                id: 'select_notebook',
                name: 'Select notebook'
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        const { selectedNote } = nextProps;

        if (selectedNote) {
            this.setState({
                notebook: (selectedNote.notebook && Object.keys(selectedNote.notebook).length) ? selectedNote.notebook : this.state.notebook
            });
        }
    }

    componentDidMount() {
        if (this.InputComponent) {
            this.InputComponent.focus();
        }
    }

    editNote(e) {
        const { selectedNote } = this.props;

        selectedNote[e.target.name] = e.target.value;

        this.setState({ selectedNote });

        this.props.actions.editNote(selectedNote);
        this.props.actions.getNotes();
    }

    editField(field) {
        this.setState(field, () => {
            this.props.actions.editNote(this.props.selectedNote, field);
        });
    }

    deleteNoteLabel() {
        this.props.actions.deleteNoteLabel(this.props.selectedNote);
        this.props.actions.getNotes();
    }

    render() {
        const { selectedNote } = this.props;

        if (!selectedNote || !selectedNote.id) {
            return <div className="empty"></div>;
        }

        // FIXME: make this a layout component
        // http://reactpatterns.com/#layout-component
        return (
            <div className="right edit-col edit-note">
                <form>
                    <div className="top">
                        <Input
                            name="title"
                            className="title"
                            placeholder="Enter title..."
                            ref={comp => { this.InputComponent = comp; }}
                            value={selectedNote.title}
                            onClick={this.focusTitleInput}
                            onChange={(e) => this.editNote(e)} />
                        <NotebookSelect
                            canAddNotebook={true}
                            editField={(notebook) => this.editField(notebook)}
                            selectedNotebook={this.state.notebook} />
                    </div>
                    <div className="mid">
                        <input
                            type="url"
                            name="url"
                            className="url"
                            placeholder="http://"
                            pattern="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?"
                            value={selectedNote.url}
                            onChange={(e) => this.editNote(e)} />
                        <LabelPicker
                            editField={(color) => this.editField({ label: color })}
                            deleteNoteLabel={this.deleteNoteLabel} />
                    </div>
                    <div className="mid">
                        <TagsInput
                            noteTags={selectedNote.tags}
                            editField={(tags) => this.editField({ tags: tags })} />
                    </div>
                    <div className="bottom">
                        <Textarea
                            name="description"
                            className="description"
                            value={selectedNote.description}
                            onChange={(e) => this.editNote(e)}>
                        </Textarea>
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
