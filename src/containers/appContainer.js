import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Mousetrap from 'mousetrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NotesContainer from './notesContainer';
import ModalContainer from './modalContainer';

import Toolbar from '../components/Toolbar';
import NoteTypes from '../components/NoteTypes';
import NoteNav from '../components/NoteNav';

import UserPhoto from '../components/UserPhoto';
import IconBtn from '../components/ui/IconBtn';

import * as userActions from '../actions/userActions';
import * as noteActions from '../actions/noteActions';
import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';
import * as labelActions from '../actions/labelActions';
import * as modalActions from '../actions/modalActions';

import { MODAL_TYPES } from '../constants/modalTypes';
import { URLS } from '../constants/menu';

class AppContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.goToGithub = this.goToGithub.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
		this.addNote = this.addNote.bind(this);
		this.showLoginModal = this.showLoginModal.bind(this);

        this.state = {
            selectedNote: '',
            notes: [],
            user: this.props.user,
            showNoteNav: true,
            showModal: false
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

    showLoginModal() {
        this.props.actions.showModal(MODAL_TYPES.LOGIN_MODAL, {
            dialogStyle: { height: 'auto', width: '300px' },
            onClose: () => this.props.actions.hideModal(),
            login: (provider) => {
                this.login(provider);
                this.props.actions.hideModal();
            }
        });
    }

    showSettingsModal() {
        this.props.actions.showModal(MODAL_TYPES.SETTINGS_MODAL, {
            dialogStyle: { height: 'auto', width: '80%' },
            onClose: () => this.props.actions.hideModal(),
            onSave: (options) => {
                this.saveSettings(options);
                this.props.actions.hideModal();
            }
        });
    }

    login(provider) {
        this.props.actions.loginUser(provider);
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
        let { user } = this.props;

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
                    <IconBtn onclick={this.goToGithub} iconClass="github" style={iconBtnStyle} />

                    <span className="user-meta">
                        <UserPhoto imgSrc={user.photo}
                            size={20}
                            style={avatarStyle} />
                        <span className="username">
                            {user.displayName}
                        </span>
                    </span>
                    <button className="logout" onClick={(e) => this.logout()}>Logout</button>
                </div>
            );
        } else if (user && user.isAnonymous) {
            loginOut = (
                <div className="user-menu">
                    <IconBtn onclick={this.goToGithub} iconClass="github" style={iconBtnStyle} />

                    <div className="user-meta">
                        <UserPhoto size={20}
                            style={avatarStyle} />
                        <span className="username">
                            {user.displayName}
                        </span>
                    </div>
                    <button className="login" onClick={this.showLoginModal}>Login</button>
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
                        <span className="tagline">Real-time note taking. Increase your productivity!</span>
                    </header>

                    <div className="wrapper">
                        <Toolbar addNote={this.addNote} actions={this.props.actions} />

                        <nav className="note-types">
                            <NoteTypes />
                        </nav>

                        <div className="main">
                            {(this.state.showNoteNav) && <NoteNav />}

                            <NotesContainer
                                showLoginModal={this.showLoginModal}
                                addNote={this.addNote} />
                        </div>
                    </div>

                    <ModalContainer />
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
    let actions = Object.assign(userActions, noteActions, notebookActions, tagActions, labelActions, modalActions);

    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
