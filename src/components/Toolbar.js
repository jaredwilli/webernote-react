import React, { Component } from 'react';

import AddNote from './AddNote';
import NoteNav from '../components/NoteNav';
import SecondaryMenu from '../components/SecondaryMenu';

import { FILE, EDIT, VIEW, NOTE, TOOLS, HELP } from '../constants/menuConst';

class Toolbar extends Component {
    constructor(props) {
        super(props);

        this.showDropdown = this.showDropdown.bind(this);

        this.state = {
            file: false,
            edit: false,
            view: false,
            note: false,
            tools: false,
            help: false
        }
    }

    resetState() {
        this.setState({
            file: false,
            edit: false,
            view: false,
            note: false,
            tools: false,
            help: false
        });
    }

    showDropdown(e) {
        let type = e.target.className;

        this.resetState();
        this.setState({
            [type]: !this.state[type]
        })
    }

    render() {

        return (
            <div>
                <nav className="toolbar">
                    <ul>
                        <NoteNav show="narrow" />

                        <li onMouseLeave={this.showDropdown}>
                            <a className="file" onMouseEnter={this.showDropdown}>File</a>
                            {this.state.file ?
                                <div onMouseLeave={this.showDropdown} className="file-dropdown">
                                    <SecondaryMenu items={FILE} />
                                </div>
                            : ''}
                        </li>
                        <li onMouseLeave={this.showDropdown}>
                            <a className="edit" onMouseEnter={this.showDropdown}>Edit</a>
                            {this.state.edit ?
                                <div className="edit-dropdown">
                                    <SecondaryMenu items={EDIT} />
                                </div>
                            : ''}
                        </li>
                        <li onMouseLeave={this.showDropdown}>
                            <a className="view" onMouseEnter={this.showDropdown}>View</a>
                            {this.state.view ?
                                <div className="view-dropdown">
                                    <SecondaryMenu items={VIEW} />
                                </div>
                            : ''}
                        </li>
                        <li onMouseLeave={this.showDropdown}>
                            <a className="note" onMouseEnter={this.showDropdown}>Note</a>
                            {this.state.note ?
                                <div className="view-dropdown">
                                    <SecondaryMenu items={NOTE} />
                                </div>
                            : ''}
                        </li>
                        <li onMouseLeave={this.showDropdown}>
                            <a className="tools" onMouseEnter={this.showDropdown}>Tools</a>
                            {this.state.tools ?
                                <div className="tools-dropdown">
                                    <SecondaryMenu items={TOOLS} />
                                </div>
                            : ''}
                        </li>
                        <li onMouseLeave={this.showDropdown}>
                            <a className="help" onMouseEnter={this.showDropdown}>Help</a>
                            {this.state.help ?
                                <div className="help-dropdown">
                                    <SecondaryMenu items={HELP} />
                                </div>
                            : ''}
                        </li>

                        <li className="new-note">
                            <AddNote addNote={this.props.addNote} />
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Toolbar;
