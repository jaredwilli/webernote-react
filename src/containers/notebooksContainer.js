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
        this.setState({
            addNotebook: false,
            notebook: {
                name: e.target.value
            }
        });

        this.props.onAddNotebook({
            name: e.target.value
        }, this.state);
    }
    
    selectNotebook(e) {
        // handle New Notebook selection
        if (e.target.name === 'notebook' && e.target.value === '+Create notebook') {
            // will have to make new component for notebook select and new notebook input
            this.setState({
                addNotebook: true
            });
        } else {
            this.setState({
                notebook: {
                    name: e.target.value
                }
            });

            this.props.onSelectNotebook({
                name: e.target.value
            }, this.state);
        }
    }
        
    render() {
        let addBookOption;
    
        if (this.props.notebooks.loading) {
            return <div className="loading">Loading...</div>;
        }

        const bookOptions = this.props.notebooks.map((note) => 
            <option key={note.id}>{note.name}</option>
        );

        // Add the New Note book option if need to
        if (this.props.canAddNotebook) {
            addBookOption = <option>+Create notebook</option>;
        }

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
                onChange={this.selectNotebook}>
                {bookOptions}
                {addBookOption}
            </select>
        );
    }
}

function mapStateToProps(state, ownProps) {
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
