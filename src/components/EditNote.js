import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as noteActions from '../actions/noteActions';

import NotebookSelect from './NotebookSelect';
import TagsContainer from '../containers/tagsContainer';
import LabelsContainer from '../containers/labelsContainer';

class EditNote extends React.Component {
    constructor(props) {
        super(props);

        this.editNote = this.editNote.bind(this);
        this.editField = this.editField.bind(this);

        this.state = {
            label: {},
            tags: [],
            notebook: {
                id: 'select_notebook',
                name: 'Select notebook'
            }
        };
    }

    componentWillReceiveProps(nextProps, prevProps) {
        debugger;
        if (nextProps.selectedNote) {
            debugger;
        }
    }

    editNote(e) {
        const { selectedNote } = this.props;

        selectedNote[e.target.name] = e.target.value;

        this.setState({
            selectedNote
        });

        this.props.actions.editNote(selectedNote);
        this.props.actions.getNotes();
    }

    editField(field) {
        debugger;
        this.setState(field, () => {
            this.props.actions.editNote(this.props.selectedNote, field);
        });
    }

    render() {
        const { selectedNote } = this.props;

        if (!selectedNote || !selectedNote.id) {
            return (
                <div className="no-selected-note"></div>
            );
        }

        return (
            <div className="right edit-col edit-note">
                <form>
                    <div className="top">
                        <input type="text" className="title" name="title"
                            placeholder="Enter title..."
                            value={selectedNote.title}
                            autoFocus={true}
                            onChange={(e) => this.editNote(e)} />
                        <NotebookSelect
                            canAddNotebook={true}
                            editField={(notebook) => this.editField(notebook)}
                            selectedNotebook={this.state.notebook} />
                    </div>
                    <div className="mid">
                        <input type="url" className="url" name="url"
                            placeholder="http://"
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
