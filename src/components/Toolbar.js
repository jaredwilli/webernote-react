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

import { MENU_CONST } from '../constants/menuConst';

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

    showDropdown(key) {
        let type = key;

        this.resetState();
        this.setState({
            [type]: !this.state[type]
        })
    }

    render() {
        const menuItems = Object.keys(MENU_CONST).map((menu) => {
            let items = MENU_CONST[menu];
            let key = menu.toLowerCase();

            return (
                <li key={key} onMouseLeave={() => this.showDropdown(key)}>
                    <a className={key} onMouseEnter={() => this.showDropdown(key)}>{key}</a>
                    {this.state[key] ?
                        <div onMouseLeave={() => this.showDropdown(key)} className={key + '-dropdown'}>
                            <SecondaryMenu items={items} actions={this.props.actions} />
                        </div>
                    : ''}
                </li>
            );
        });

        return (
            <div className="toolbar">
                <nav>
                    <ul>
                        <NoteNav show="narrow" />

                        {menuItems}

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
