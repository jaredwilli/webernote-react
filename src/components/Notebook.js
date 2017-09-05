import React, { Component } from 'react';
import { connect } from 'react-redux';

class Notebook extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleAddNotebook = this.handleAddNotebook.bind(this);

        this.state = {
            notebook: '',
            selectedNotebook: this.props.notebook
        };
    }

    handleAddNotebook(e) {
        this.setState({
            notebook: e.target.value
        });
        this.props.onAddNotebook(this.state.notebook);
    }

    handleChange(e) {
        // handle New Notebook selection
        if (e.target.name === 'notebook' && e.target.value === 'New Notebook') {
            // will have to make new component for notebook select and new notebook input
            this.setState({
                addNotebook: true
            });
        }

        this.setState({
            notebook: e.target.value
        });
    }

    render() {
        if (this.state.addNotebook) {
            return (
                <span>
                    <button className="cancel-new" onClick={() => this.setState({ addNotebook: false })}>x</button>
                    <input type="text" name="notebook" className="new-notebook" placeholder="Notebook name..."
                        onChange={this.handleAddNotebook} />
                </span>
            );
        }

        return (
            <span>
                <select name="notebook" className="notebook" 
                    value={this.state.selectedNotebook} 
                    onChange={this.handleChange}>
                    <option>My Notebook</option>
                    <option>New Notebook</option>
                </select>
            </span>
        );
    }
}

export default connect((state) => state)(Notebook);
