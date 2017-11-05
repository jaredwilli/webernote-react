import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Mousetrap from 'mousetrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NotesContainer from './notesContainer';
import ModalContainer from './modalContainer';

import WelcomeMsg from '../components/WelcomeMsg';
import LoginOut from '../components/LoginOut';
import Toolbar from '../components/Toolbar';
import NoteTypes from '../components/NoteTypes';
import NoteNav from '../components/NoteNav';

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
            user: this.props.user,
            selectedNote: '',
            notes: {},
            showNoteNav: true,
            showModal: false
        };
    }

    // Handle keyboard shortcuts
    componentDidMount() {
        this.props.actions.getNotes(this.state.user);

        this.props.actions.listenForDeletedNotebook();
        this.props.actions.listenForDeletedTags();
        this.props.actions.listenForDeletedLabels();

        Mousetrap.bind(['ctrl+n'], (e) => this.addNote(e));
        Mousetrap.bind(['command+b'], (e) => this.toggleNoteNav(e));
    }

    componentWillUnmount() {
        this.props.actions.listenForDeletedNotebook();
        this.props.actions.listenForDeletedTags();
        this.props.actions.listenForDeletedLabels();

        Mousetrap.unbind(['ctrl+n'], (e) => this.addNote(e));
        Mousetrap.unbind(['command+b'], (e) => this.toggleNoteNav(e));
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

        if (!user.notes) {
            return <WelcomeMsg addNote={this.addNote} showLoginModal={this.showLoginModal} />
        }

        return (
            <MuiThemeProvider>
                <div className="full-wrapper">
                    <header>
                        <LoginOut user={user}
                            logout={this.logout}
                            showLoginModal={this.showLoginModal}
                            goToGithub={this.goToGithub} />

                        <h1><Link to="/">Webernote<sup>TM</sup></Link></h1>
                        <span className="tagline">Real-time note taking. Increase your productivity!</span>
                    </header>

                    <div className="wrapper">
                        <Toolbar addNote={this.addNote}  />

                        <nav className="note-types">
                            <NoteTypes user={user} />
                        </nav>

                        <div className="main">
                            {(this.state.showNoteNav) && <NoteNav show="wide" />}

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
        user: state.userData.user
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({},
        userActions, noteActions, notebookActions,
        tagActions, labelActions, modalActions
    );

    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
