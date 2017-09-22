import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as notebookActions from '../actions/notebookActions';

class NotebooksContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.selectNotebook = this.selectNotebook.bind(this);
        this.addNotebook = this.addNotebook.bind(this);
        this.keyPress = this.keyPress.bind(this);

        this.state = {
            addNotebook: false
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
        let notebook = {
            name: e.target.value
        };

        this.setState({
            addNotebook: false,
            notebook: notebook
        });

        this.props.actions.addNotebook(notebook);
        this.props.editNotebook(notebook);
    }
    
    selectNotebook(e) {
        debugger
        // Handle New Notebook selection
        if (e.target.name === 'notebook' && e.target.value === '+Create notebook') {
            // will have to make new component for notebook select and new notebook input
            this.setState({
                addNotebook: true
            });
        } else {
            let notebookId = '';
            
            // get selected notebook id
            for (let n of e.target.children) {
                if (n.value === e.target.value) {
                    notebookId = n.getAttribute('id');
                }
            }

            const notebook = this.props.notebooks.filter(function(b) {
                return b.id === notebookId;
            })[0];
            
            this.setState({
                canAddNotebook: false
            });

            this.props.editNotebook(notebook);
            // get notebooks again to update the state
            this.props.actions.getNotebooks();
        }
    }

    render() {
        let addNoteBookOption = '';

        if (!this.props.selectedNote) {
            return <div className="loading">Loading...</div>;
        }

        if (!this.props.notebooks) {
            return <div className="loading">Loading...</div>;
        }

        // Notebook menu options
        const notebookOptions = this.props.notebooks.map((notebook) => 
            <option key={notebook.id} id={notebook.id}>{notebook.name}</option>
        );

        // Add the New Note book option if need to
        if (this.props.canAddNotebook) {
            addNoteBookOption = <option>+Create notebook</option>;
        }

        // Show add notebook input if selected add notebook
        if (this.state.addNotebook) {
            return (
                <span>
                    <button className="cancel-new" onClick={() => this.setState({ addNotebook: false })}>x</button>
                    <input type="text" name="notebook" className="new-notebook" placeholder="Notebook name..."
                        autoFocus={true}
                        onBlur={this.addNotebook}
                        onKeyDown={this.keyPress} />
                </span>
            );
        }

        return (
            <select name="notebook" className="notebook" 
                value={this.props.selectedNote.notebook}
                onChange={(e) => this.selectNotebook(e)}>
                {notebookOptions}
                {addNoteBookOption}
            </select>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        notebooks: state.notebookData.notebooks,
        selectedNote: state.noteData.selectedNote,
        selectedNotebook: state.notebookData.selectedNotebook
    };
    console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(notebookActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebooksContainer);
