import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Toolbar from '../components/shared/toolbar/Toolbar';
import NoteTypes from '../components/shared/toolbar/NoteTypes';
import PrimaryHeader from '../components/shared/header/PrimaryHeader';

import ModalContainer from '../containers/modalContainer';

// Sub Layouts
import HomePage from './home/HomePage';
import UsersListPage from './users/UsersListPage';
import UserProfilePage from './users/UserProfilePage';
import AdminPage from './admin/AdminPage';

import * as userActions from '../actions/userActions';
import * as noteActions from '../actions/noteActions';
import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';
import * as labelActions from '../actions/labelActions';
import * as modalActions from '../actions/modalActions';

import { MODAL_TYPES } from '../constants/modalTypes';

class PrimaryPage extends React.Component {
    constructor(props) {
        super(props);

        this.goToUrl = this.goToUrl.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
		this.addNote = this.addNote.bind(this);
		this.showLoginModal = this.showLoginModal.bind(this);

        this.state = {
            user: this.props.user,
            selectedNote: '',
            notes: [],
            showNoteNav: true,
            showModal: false
        };
    }

    goToUrl(url) {
        window.open(url);
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

    login(provider) {
        this.props.actions.loginUser(provider);
    }

    logout() {
        this.props.actions.logoutUser();
    }

    // addNote(e) {
	// 	this.props.actions.resetSelectedNote();
	// 	this.props.actions.addNote();
    // }

    render() {
        const { match, user } = this.props;

        console.log(user);
        // debugger;

        return (
            <MuiThemeProvider>
                <div className="full-wrapper">
                    <PrimaryHeader
                        user={user}
                        match={match}
                        {...this.props} />

                    <div className="wrapper">
                        <Toolbar
                            user={user}
                            match={match}
                            {...this.props} />

                        <NoteTypes />

                        <main>
                            <Switch>
                                <Route
                                    path={`${match.path}`} exact
                                    component={HomePage}
                                    {...this.props} />
                                <Route
                                    path={`${match.path}/users/:userUid`}
                                    component={UserProfilePage}
                                    {...this.props} />
                                <Route
                                    path={`${match.path}/users`}
                                    component={UsersListPage}
                                    {...this.props} />
                                <Route
                                    path={`${match.path}/admin`}
                                    component={AdminPage}
                                    {...this.props} />

                                <Redirect to={`${match.url}`} />
                            </Switch>
                        </main>
                    </div>

                    <ModalContainer />
                </div>
            </MuiThemeProvider>
        );
    }
}


function mapStateToProps({ userData, noteData }) {
    const newState = {
        user: userData.user,
        notes: noteData.notes
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign(userActions, noteActions, notebookActions, tagActions, labelActions, modalActions);

    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryPage);
