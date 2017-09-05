import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as notebookActions from '../actions/notebookActions';

class NotebookContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.selectNotebook = this.selectNotebook.bind(this);
        this.addNotebook = this.addNotebook.bind(this);
        // this.props.actions.getNotebooks();
    }

    addNotebook(e) {
        let notebook = {
            name: e.target.value
        };

        this.setState({
            addNotebook: false,
            notebook: notebook
        });

        this.props.onAddNotebook(notebook);
    }
    
    selectNotebook(e) {
        // handle New Notebook selection
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
                notebook: notebook
            });

            this.props.editNotebook(notebook);
        }
    }

    render() {
        let addNoteBookOption = '';

        if (this.props.notebooks.loading) {
            return <div className="loading">Loading...</div>;
        }

        const notebookOptions = this.props.notebooks.map((notebook) => 
            <option key={notebook.id} id={notebook.id}>{notebook.name}</option>
        );

        // Add the New Note book option if need to
        if (this.props.canAddNotebook) {
            addNoteBookOption = <option>+Create notebook</option>;
        }

        // Show add notebook input if selected add notebook
        if (this.props.addNotebook) {
            return (
                <span>
                    <button className="cancel-new" onClick={() => this.setState({ addNotebook: false })}>x</button>
                    <input type="text" name="notebook" className="new-notebook" placeholder="Notebook name..."
                        onBlur={this.addNotebook} />
                </span>
            );
        }

        return (
            <select name="notebook" className="notebook" 
                value={this.props.notebook}
                onChange={(e) => this.selectNotebook(e)}>
                {notebookOptions}
                {addNoteBookOption}
            </select>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        notebooks: (state.notebookData.notebooks) ? state.notebookData.notebooks : {
            loading: true
        }
    };
    console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(notebookActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotebookContainer);
