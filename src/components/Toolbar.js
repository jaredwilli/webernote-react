import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as noteActions from '../actions/noteActions';
import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';
import * as labelActions from '../actions/labelActions';

import AddNote from './AddNote';
import NoteNav from '../components/NoteNav';
import SecondaryMenu from '../components/SecondaryMenu';

import { FILE, EDIT, VIEW, NOTE, TOOLS, HELP } from '../constants/menuConst';

import '../styles/toolbar.css';

class Toolbar extends Component {
    constructor(props) {
        super(props);

        this.showDropdown = this.showDropdown.bind(this);
        this.goToUrl = this.goToUrl.bind(this);

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

    goToUrl(url) {
        window.open(url);
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
            <div className="toolbar">
                <nav>
                    <ul>
                        <NoteNav show="narrow" />

                        <li onMouseLeave={this.showDropdown}>
                            <a className="file" onMouseEnter={this.showDropdown}>File</a>
                            {this.state.file ?
                                <div onMouseLeave={this.showDropdown} className="file-dropdown">
                                    <SecondaryMenu items={FILE}
                                        actions={this.props.actions} />
                                </div>
                            : ''}
                        </li>
                        <li onMouseLeave={this.showDropdown}>
                            <a className="edit" onMouseEnter={this.showDropdown}>Edit</a>
                            {this.state.edit ?
                                <div className="edit-dropdown">
                                    <SecondaryMenu items={EDIT}
                                        actions={this.props.actions} />
                                </div>
                            : ''}
                        </li>
                        <li onMouseLeave={this.showDropdown}>
                            <a className="view" onMouseEnter={this.showDropdown}>View</a>
                            {this.state.view ?
                                <div className="view-dropdown">
                                    <SecondaryMenu items={VIEW}
                                        actions={this.props.actions} />
                                </div>
                            : ''}
                        </li>
                        <li onMouseLeave={this.showDropdown}>
                            <a className="note" onMouseEnter={this.showDropdown}>Note</a>
                            {this.state.note ?
                                <div className="view-dropdown">
                                    <SecondaryMenu items={NOTE}
                                        actions={this.props.actions} />
                                </div>
                            : ''}
                        </li>
                        <li onMouseLeave={this.showDropdown}>
                            <a className="tools" onMouseEnter={this.showDropdown}>Tools</a>
                            {this.state.tools ?
                                <div className="tools-dropdown">
                                    <SecondaryMenu items={TOOLS}
                                        actions={this.props.actions} />
                                </div>
                            : ''}
                        </li>
                        <li onMouseLeave={this.showDropdown}>
                            <a className="help" onMouseEnter={this.showDropdown}>Help</a>
                            {this.state.help ?
                                <div className="help-dropdown">
                                    <SecondaryMenu items={HELP}
                                        goToUrl={this.goToUrl}
                                        actions={this.props.actions} />
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

function mapStateToProps(state) {
    const newState = {
        notes: state.noteData.notes,
        notebooks: state.notebookData.notebooks,
        tags: state.tagData.tags,
        labels: state.labelData.labels
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    let actions = Object.assign({}, noteActions, notebookActions, tagActions, labelActions);

    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Toolbar));
