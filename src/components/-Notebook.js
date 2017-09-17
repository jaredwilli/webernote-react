import React, { Component } from 'react';
import { connect } from 'react-redux';

class Notebook extends Component {
    constructor(props) {
        super(props);

        this.selectNotebook = this.selectNotebook.bind(this);
        this.addNotebook = this.addNotebook.bind(this);

        this.state = {
            notebook: '',
            selectedNotebook: this.props.notebook
        };
    }

    addNotebook(e) {
        this.setState({
            notebook: e.target.value
        });

        this.props.onAddNotebook(this.state.notebook);
        this.props.selectNotebook(this.state.notebook);
    }

    selectNotebook(e) {
        // handle New Notebook selection
        if (e.target.name === 'notebook' && e.target.value === 'New Notebook') {
            // will have to make new component for notebook select and new notebook input
            this.setState({
                addNotebook: true
            });

            this.addNotebook(e);
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
                        onChange={this.addNotebook} />
                </span>
            );
        }

        return (
            <span>
                <select name="notebook" className="notebook" 
                    value={this.state.selectedNotebook} 
                    onChange={this.selectNotebook}>
                    <option>My Notebook</option>
                    <option>New Notebook</option>
                </select>
            </span>
        );
    }
}

export default connect((state) => state)(Notebook);
