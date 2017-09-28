import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as notebookActions from '../actions/notebookActions';
import { getSelectedNotebook } from '../common/noteHelpers.js';

class NotebooksContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.selectNotebook = this.selectNotebook.bind(this);
        this.addNotebook = this.addNotebook.bind(this);
        this.keyPress = this.keyPress.bind(this);

        this.state = {
            addNotebook: false,
            selectedNotebook: (this.props.selectedNotebook) ? this.props.selectedNotebook : this.props.selectedNote.notebook
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
                canAddNotebook: false,
                selectedNotebook: notebook
            });

            this.updateNotebook(notebook);
        }
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
        const filterByNotebook = this.props.filterByNotebook;
        let allNotebooks = '';
        let addNotebookOption = '';

        if (!this.props.selectedNote || !this.props.notebooks) {
            return <div className="loading">Loading...</div>;
        }

        // Notebook menu options
        const notebookOptions = this.props.notebooks.map((notebook) => 
            <option key={notebook.id} id={notebook.id}>{notebook.name}</option>
        );

        // Add the New Note book option if need to
        if (this.props.canAddNotebook) {
            addNotebookOption = <option>+Create notebook</option>;
        } else {
            allNotebooks = (
                <option key={0} id={0}>All</option>
            );

            return (
                <select name="notebook" className="notebook" 
                    value={this.value}
                    onChange={(e) => this.props.filterByNotebook(e)}>
                    {notebookOptions}
                </select>
            )
        }

        // Show add notebook input if selected add notebook
        if (this.state.addNotebook) {
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
                value={this.props.selectedNote.notebook.name}
                onChange={(e) => this.selectNotebook(e)}>
                {notebookOptions}
                {addNotebookOption}
            </select>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
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
