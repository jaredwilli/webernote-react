import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NotesContainer from '../containers/notesContainer';
import ModalContainer from '../containers/modalContainer';

import Toolbar from '../components/Toolbar';
import NoteTypes from '../components/NoteTypes';
import NoteNav from '../components/NoteNav';
import Logo from '../components/stateless/Logo';
import LoginOut from '../components/LoginOut';

import { MODAL_TYPES } from '../constants/modalTypes';
import { URLS } from '../constants/menu';

class PageComponent extends React.Component {
    render() {
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

                        <nav className="note-types">
                            <NoteTypes />
                        </nav>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageComponent));

