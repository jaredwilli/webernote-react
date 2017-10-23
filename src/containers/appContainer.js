import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Mousetrap from 'mousetrap';
import ReactLoading from 'react-loading';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Toolbar from '../components/Toolbar';
import NoteTypes from '../components/NoteTypes';
import NoteNav from '../components/NoteNav';
import NotesContainer from './notesContainer';

import UserPhoto from '../components/UserPhoto';
import IconBtn from '../components/IconBtn';

import * as userActions from '../actions/userActions';
import * as noteActions from '../actions/noteActions';
import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';
import * as labelActions from '../actions/labelActions';

import { URLS } from '../constants/menuConst';
import '../App.css';
import '../styles/note-types.css';


class AppContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.goToGithub = this.goToGithub.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
		this.addNote = this.addNote.bind(this);

        this.state = {
            selectedNote: '',
            notes: [],
            user: this.props.user,
            showNoteNav: true
        }
    }

    shouldComponentUpdate(nextProps, prevState) {
        if (nextProps.user && prevState.user) {
            return nextProps.user.uid !== prevState.user.uid;
        }
        return true;
    }

    componentWillUpdate(nextProps) {
        if (nextProps.user !== '') {
            this.setState({
                user: nextProps.user
            }, this.updateData);
        }
    }

    // Handle keyboard shortcuts
    componentDidMount() {
        Mousetrap.bind(['ctrl+n'], (e) => this.addNote(e));
        Mousetrap.bind(['command+b'], (e) => this.toggleNoteNav(e));
    }

    componentWillUnmount() {
        Mousetrap.unbind(['ctrl+n'], (e) => this.addNote(e));
        Mousetrap.unbind(['command+b'], (e) => this.toggleNoteNav(e));
    }

    updateData() {
        this.props.actions.getNotes(this.state.user);
        this.props.actions.getNotebooks(this.state.user);
        this.props.actions.getTags(this.state.user);
        this.props.actions.getLabels(this.state.user);

        this.props.actions.listenForDeletedNotebook();
        this.props.actions.listenForDeletedTags();
        this.props.actions.listenForDeletedLabels();
    }

    toggleNoteNav(e) {
        e.preventDefault();
        this.setState({
            showNoteNav: !this.state.showNoteNav
        });
    }

    goToGithub() {
        window.open(URLS.GITHUB_REPO);
    }

    login() {
        this.props.actions.resetSelectedNote();
        this.props.actions.loginUser(this.props.user);
    }

    logout() {
        this.props.actions.logoutUser();
    }

    addNote(e) {
        e.preventDefault();
		this.props.actions.resetSelectedNote();
		this.props.actions.addNote();
	}

    render() {
        let { user, notes } = this.props;

        let loginOut = '';
        let avatarStyle = {
            border: '1px solid rgba(51, 51, 51, 0.50)'
        };
        let iconBtnStyle = {
	        verticalAlign: 'bottom'
        };

        // Setup login/out and user meta block
        if (user && !user.isAnonymous) {
            loginOut = (
                <div className="user-menu">
                    <IconBtn onclick={this.goToGithub} style={iconBtnStyle} />
                    <span className="user-meta">
                        <UserPhoto imgSrc={user.photo}
                            size={20}
                            style={avatarStyle} />
                        <span className="username">
                            {user.displayName}
                        </span>
                    </span>
                    <button className="logout" onClick={this.logout}>Logout</button>
                </div>
            );
        } else if (user && user.isAnonymous) {
            loginOut = (
                <div className="user-menu">
                    <IconBtn onclick={this.goToGithub} style={iconBtnStyle} />
                    <div className="user-meta">
                        <UserPhoto size={20}
                            style={avatarStyle} />
                        <span className="username">
                            {user.displayName}
                        </span>
                    </div>
                    <button className="login" onClick={this.login}>Login</button>
                </div>
            );
        }

        return (
            <MuiThemeProvider>
                <div className="full-wrapper">
                    <header>
                        <div className="loginout">
                            {loginOut}
                        </div>

                        <h1><Link to="/">Webernote<sup>TM</sup></Link></h1>
                        <span>Real-time note taking. Increase your productivity!</span>
                    </header>

                    <div className="wrapper">
                        <Toolbar addNote={this.addNote} />

                        <nav className="note-types">
                            <NoteTypes />
                        </nav>
{this.state.showNoteNav}
                        <div className="main">
                            {(this.state.showNoteNav) ? <NoteNav show="wide" /> : '' }

                            <NotesContainer login={this.login}
                                addNote={this.addNote} />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        user: state.userData.user,
        notes: state.noteData.notes
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
