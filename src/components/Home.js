import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Mousetrap from 'mousetrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NotesContainer from '../containers/notesContainer';
import ModalContainer from '../containers/modalContainer';

import Toolbar from './Toolbar';
import NoteTypes from './NoteTypes';
import NoteNav from './NoteNav';

import Logo from './stateless/Logo';
import LoginOut from './LoginOut';

import * as userActions from '../actions/userActions';
import * as noteActions from '../actions/noteActions';
import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';
import * as labelActions from '../actions/labelActions';
import * as modalActions from '../actions/modalActions';

import { MODAL_TYPES } from '../constants/modalTypes';
import { URLS } from '../constants/menu';

class Home extends React.Component {
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
            notes: [],
            showNoteNav: true,
            showModal: false,
            isMounted: false
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
        Mousetrap.bind(['ctrl+n'], event => this.addNote(event));
        Mousetrap.bind(['command+b'], event => this.toggleNoteNav(event));
    }

    componentWillUnmount() {
        Mousetrap.unbind(['ctrl+n'], event => this.addNote(event));
        Mousetrap.unbind(['command+b'], event => this.toggleNoteNav(event));
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

    addNote(event) {
        event.preventDefault();
		this.props.actions.resetSelectedNote();
		this.props.actions.addNote();
    }

    render() {
        const { user = {} } = this.props;

        return (
            <MuiThemeProvider>
                <div className="full-wrapper">
                    <header>
                        <LoginOut
                            user={user}
                            goToGithub={this.goToGithub}
                            showLoginModal={this.showLoginModal}
                            logout={this.logout} />

                        <Logo />
                    </header>

                    <div className="wrapper">
                        <Toolbar addNote={this.addNote} actions={this.props.actions} />

                        <NoteTypes />

                        <div className="main">
                            {(this.state.showNoteNav) && <NoteNav show="wide" /> }

                            <NotesContainer showLoginModal={this.showLoginModal}
                                addNote={this.addNote} />
                        </div>
                    </div>

                    <ModalContainer />
                </div>
            </MuiThemeProvider>
        );
    }
}

Home.propTypes = {
    actions: PropTypes.object,
    user: PropTypes.object
};

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
