import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getSelectedNotebook, filterData } from '../common/noteHelpers.js';
import * as notebookActions from '../actions/notebookActions';

class NotebooksContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.selectNotebook = this.selectNotebook.bind(this);
        this.addNotebook = this.addNotebook.bind(this);
        this.keyPress = this.keyPress.bind(this);

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

    addNotebook(e) {
        if (e.target.value === '') {
            this.setState({
                addNotebook: false
            });  
        } else {
            this.setState({
                addNotebook: false
            });
            
            let notebook = {
                name: e.target.value
            };

            // Add the notebook
            let notebookExists = this.props.notebooks.filter((n) => {
                return n.name === notebook.name;
            });

            // If not exists add it otherwise use existing
            if (!notebookExists.length) {
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
        this.props.actions.removeNotebook(this.props.notes);
        // Edit notebook selection
        this.props.editNotebook(notebook);
        // get notebooks again to update the state
        this.props.actions.getNotebooks();
    }

    render() {
        const user = this.props.user;
        let notebooks = this.props.notebooks;

        // Notebook menu options
        let notebookOptions;
        // Create notebook option
        let addNoteBookOption = '';
        let allNotebooksOption = '';
        let notebookSelection;

        // Check for notebooks first
        if (!notebooks) {
            return <div className="loading">Loading...</div>;
        } else {
            notebooks = filterData(user, notebooks);
            
            notebookOptions = notebooks.map((notebook) => 
                <option key={notebook.id} id={notebook.id}>{notebook.name}</option>
            );
            
            // If can't add notebooks then render the filter notebook menu
            if (this.props.canAddNotebook) {
                // If can add notebooks check that selectedNote is set
                if (!this.props.selectedNote) {
                    return <div className="loading">Loading...</div>;
                } else {
                    notebookSelection = this.props.selectedNote.notebook.name;
                    addNoteBookOption = <option>+Create notebook</option>;
                }
            } else {
                notebookSelection = this.props.selectedNotebook;
                allNotebooksOption = <option key={0}>All Notebooks</option>
            }
        }

        // Show add notebook input if selected add notebook
        if (this.props.canAddNotebook && this.state.addNotebook) {
            return (
                <span>
                    <button className="cancel-new" 
                        onClick={() => this.setState({ addNotebook: false })}>x
                    </button>
                    <input type="text" name="notebook" className="new-notebook" 
                        placeholder="Notebook name"
                        autoFocus={true}
                        onBlur={this.addNotebook}
                        onKeyDown={this.keyPress} />
                </span>
            );
        }

        return (
            <select name="notebook" className="notebook" 
                value={notebookSelection}
                onChange={(e) => this.selectNotebook(e)}>
                {allNotebooksOption}
                {notebookOptions}
                {addNoteBookOption}
            </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotebooksContainer);
