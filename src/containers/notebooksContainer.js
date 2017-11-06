import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { getSelectedNotebook } from '../common/noteHelpers.js';
import * as notebookActions from '../actions/notebookActions';

class NotebooksContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.selectNotebook = this.selectNotebook.bind(this);
        this.addNotebook = this.addNotebook.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.cancelNew = this.cancelNew.bind(this);

        this.state = {
            addNotebook: false,
            filterByNotebook: ''
        };
    }

    // Handle tab or enter keypress for new notebooks
    // TODO: add a minimum character limit for new notebooks
    keyPress(e) {
        // If enter or tab key pressed on new notebook input
        if (e.keyCode === 13 || e.keyCode === 9) {
            this.addNotebook(e);
        }
    }

    cancelNew(e) {
        e.preventDefault();
        const { notebooks } = this.props;

        if (notebooks && notebooks.length) {
            this.setState({ addNotebook: false });
        }
    }

    addNotebook(e) {
        const { notebooks } = this.props;
        let notebookExists = [];

        this.setState({
            addNotebook: false
        });

        if (e.target.value !== '') {
            this.setState({
                addNotebook: false
            });

            let notebook = {
                name: e.target.value
            };

            if (notebooks) {
                notebookExists = notebooks.filter((n) => {
                    return n.name === notebook.name;
                });
            }

            // If not exists add it otherwise use existing
            if (!notebookExists.length) {
                // Add the notebook
                this.props.actions.addNotebook(notebook);
            } else {
                notebook = notebookExists[0];
            }

            this.updateNotebook(notebook);
        }
    }

    selectNotebook(e) {
        // Handle New Notebook selection
        if (e.target.name === 'notebook' && e.target.value === '+Create notebook') {
            // will have to make new component for notebook select and new notebook input
            this.setState({
                addNotebook: true
            });
        } else {
            const notebook = getSelectedNotebook(e, this.props.notebooks);

            this.setState({
                addNotebook: false,
                selectedNotebook: notebook
            });

            if (this.props.canAddNotebook) {
                this.updateNotebook(notebook);
            } else {
                this.filterNotebooks(notebook);
            }
        }
    }

    filterNotebooks(notebook) {
        this.setState({
            filterByNotebook: notebook
        });
        this.props.filterByNotebook(notebook);
    }

    updateNotebook(notebook) {
        // Check if need to remove a notebook
        if (this.props.notebooks) {
            this.props.actions.removeNotebook(this.props.notes);
        }
        // Edit notebook selection
        this.props.editNotebook(notebook);
        // get notebooks again to update the state
        this.props.actions.getNotebooks();
    }

    render() {
        const selectedNote = this.props.selectedNote;
        let notebooks = this.props.notebooks;

        // Notebook menu options
        let notebookOptions;
        // Additional notebook options
        let selectNoteBookOption = '';
        let addNoteBookOption = '';
        let allNotebooksOption = '';
        let notebookSelection;

        // Check for notebooks first
        if (notebooks) {
            notebookOptions = notebooks.map((notebook) =>
                <option key={notebook.id} id={notebook.id}>{notebook.name}</option>
            );

            // If can't add notebooks then render the filter notebook menu
            if (this.props.canAddNotebook) {
                selectNoteBookOption = <option>Select notebook</option>;
                addNoteBookOption = <option>+Create notebook</option>;

                // If can add notebooks check that selectedNote is set
                if (selectedNote && selectedNote.notebook) {
                    notebookSelection = selectedNote.notebook.name;
                } else {
                    notebookSelection = selectNoteBookOption;
                }
            } else {
                // notebookSelection = this.props.selectedNotebook;
                allNotebooksOption = <option>All Notebooks</option>
                notebookSelection = this.props.notebookFilter;
            }
        }

        // Show add notebook input if selected add notebook
        if (this.props.canAddNotebook) {
            let showAddNotebook;
            if (this.state.addNotebook) {
                showAddNotebook = true;
            } else if (!notebooks || !notebooks.length) {
                showAddNotebook = true;
            }

            if (showAddNotebook) {
                return (
                    <span className="add-notebook">
                        <input type="text" name="notebook" className="new-notebook"
                            placeholder="Notebook name"
                            onBlur={this.addNotebook}
                            onKeyDown={this.keyPress} />

                        <span className="remove Select-clear"
                            onClick={(e) => this.setState({ addNotebook: false })}>×
                        </span>
                    </span>
                );
            }
        }

        return (
            <span className="select-notebook">
                <select name="notebook" className="notebook"
                    value={notebookSelection}
                    onChange={(e) => this.selectNotebook(e)}>
                    {selectNoteBookOption}
                    {allNotebooksOption}
                    {notebookOptions}
                    {addNoteBookOption}
                </select>
            </span>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        user: state.userData.user,
        notes: state.noteData.notes,
        notebooks: state.notebookData.notebooks,
        selectedNote: state.noteData.selectedNote,
        selectedNotebook: state.notebookData.selectedNotebook
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(notebookActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebooksContainer));
