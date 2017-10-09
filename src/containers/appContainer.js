import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import UserImg from '../components/Avatar';
import NotesContainer from './notesContainer';

import * as userActions from '../actions/userActions';
import * as noteActions from '../actions/noteActions';
import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';
import * as labelActions from '../actions/labelActions';

import '../App.css';

class AppContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        // this.actions = Object.assign(userActions, noteActions, notebookActions, tagActions, labelActions);
        console.log(this.props.user);

        this.props.actions.getNotes();
        this.props.actions.getNotebooks();
        this.props.actions.getTags();
        this.props.actions.getLabels();

        this.props.actions.listenForDeletedNotebook();
        this.props.actions.listenForDeletedTags();
        this.props.actions.listenForDeletedLabels();

        this.state = {
            selectedNote: '',
            notes: this.props.actions.getNotes(this.props.user),
            user: this.props.user
        }
    }

    // componentDidMount() {
    //     debugger;
    //     this.props.actions.getNotes(this.props.user);
    //     this.props.actions.getNotebooks(this.props.user);
    //     this.props.actions.getTags(this.props.user);
    //     this.props.actions.getLabels(this.props.user);
    // }

    login() {
        this.props.actions.resetSelectedNote();
        this.props.actions.loginUser();
    }

    logout() {
        this.props.actions.resetSelectedNote();
        this.props.actions.logoutUser();
        this.props.actions.getNotes();
    }

    render() {
        let loginOut = '';

        if (this.props.user) {
            loginOut = (
                <div className="user-menu">
                    <span className="user-meta">
                        <UserImg imgSrc={this.props.user.photo} size={25} />
                        <span className="username">
                            {this.props.user.displayName}
                        </span>
                    </span>
                    <button className="logout" onClick={this.logout}>Logout</button>
                </div>
            );
        } else {
            loginOut = (
                <div className="user-menu">
                    <button className="login" onClick={this.login}>Login</button>
                </div>
            );
        }

        return (
            <MuiThemeProvider>
                <div>
                    <header>
                        <div className="loginout">
                            {loginOut}
                        </div>

                        <h1><a href="/">Webernote<sup>TM</sup></a></h1>
                        <span>A TodoApp on steroids...</span>

                        <span className="old-versions-nav">
                            Check out <a href="http://anti-code.com/webernote/" target="_blank" rel="noopener noreferrer">v1</a> and <a href="https://github.com/jaredwilli/webernote/tree/angular/" target="_blank" rel="noopener noreferrer">v2</a>!
                        </span>
                    </header>

                    <NotesContainer />
                </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        users: state.userData.users,
        user: state.userData.user,
        notes: state.noteData.notes,
        notebooks: state.notebookData.notebooks,
        tags: state.tagData.tags,
        labels: state.labelData.labels
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    let actions = Object.assign(userActions, noteActions, notebookActions, tagActions, labelActions);

    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
