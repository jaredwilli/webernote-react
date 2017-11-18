import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import AddNotebook from './AddNotebook';
import SelectMenu from './stateless/SelectMenu';

import { getSelectedNotebook } from '../common/noteHelpers.js';
import * as notebookActions from '../actions/notebookActions';

class NotebookSelect extends React.Component {
    constructor(props) {
        super(props);

        this.selectNotebook = this.selectNotebook.bind(this);
        this.addNotebook = this.addNotebook.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.toggleAddState = this.toggleAddState.bind(this)

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

    toggleAddState() {
        this.setState({
            addNotebook: !this.state.addNotebook
        });
    }

    addNotebook(e) {
        const { notebooks = [] } = this.props;
        let notebook = {
            name: e.target.value
        };

        if (notebook.name !== '') {
            this.toggleAddState();

            // Check if exists
            const exists = notebooks.find(n => n.name === notebook.name);

            // Add the notebook
            if (!exists) {
                this.props.actions.addNotebook(notebook);
            }

            this.toggleAddState();
            this.updateNotebook(notebook);
        }
    }

    selectNotebook(e) {
        // Handle New Notebook selection
        if (e.target.value === 'Create notebook') {
            this.toggleAddState();
        } else {
            const notebook = getSelectedNotebook(e, this.props.notebooks);
            this.updateNotebook(notebook);
        }
    }

    updateNotebook(notebook) {
        const { notes, notebooks = [] } = this.props;

        // Edit notebook selection
        this.props.editField({ notebook });

        // Check if need to remove a notebook
        if (notebooks.length) {
            this.props.actions.removeNotebook(notes);
        }

        // get notebooks again to update the state
        this.props.actions.getNotebooks();
    }

    render() {
        const { selectedNotebook, notebooks = [] } = this.props;

        // Notebook menu options
        // Additional notebook options
        const defaultValue = 'Select notebook';
        const createValue = 'Create notebook';
        const defaultOption = <option>{defaultValue}</option>;
        const createOption = <option>{createValue}</option>;
        // Create the list of options
        const options = notebooks.map(notebook => <option key={notebook.id} value={notebook.id}>{notebook.name}</option>);

        if (this.state.addNotebook || !notebooks.length) {
            return (
                <AddNotebook
                    notebooks={notebooks}
                    addNotebook={this.addNotebook}
                    keyPress={this.keyPress}
                    toggleAddState={this.toggleAddState} />
            );
        }

        return (
            <span className="select-notebook">
                <SelectMenu
                    name="notebook"
                    className="notebook select-component"
                    defaultValue={defaultValue}
                    value={selectedNotebook.id}
                    onChange={(e) => this.selectNotebook(e)}>
                    {defaultOption}
                    {options}
                    {createOption}
                </SelectMenu>
            </span>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        notes: state.noteData.notes,
        notebooks: state.notebookData.notebooks
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(notebookActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotebookSelect));
