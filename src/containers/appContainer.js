import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { auth, fbProvider } from '../data/firebase.js';

import NotesContainer from './notesContainer.js';

import * as userActions from '../actions/userActions';
import * as noteActions from '../actions/noteActions';

import '../App.css';

class AppContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = {
            selectedNote: '',
            notes: [],
            user: null
        }
    }

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
        return (
            <div>
                <header>
                    <div className="loginout">
                        {this.props.user ?
                            <div className="user-menu">
                                <span className="user-meta">
                                    <img src={this.props.user.photo} alt={this.props.user.displayName} />
                                    <span className="username">
                                        {this.props.user.displayName}
                                    </span>
                                </span>
                                <button className="logout" onClick={this.logout}>Logout</button>
                            </div>
                        :
                            <div className="user-menu">
                                <button className="login" onClick={this.login}>Login</button>
                            </div>
                        }
                    </div>
                    
                    <h1><a href="/">Webernote<sup>TM</sup></a></h1>
                    <span>A TodoApp on steroids...</span>

                    <span className="old-versions-nav">
                        Check out <a href="http://anti-code.com/webernote/" target="_blank" rel="noopener noreferrer">v1</a> and <a href="https://github.com/jaredwilli/webernote/tree/angular/" target="_blank" rel="noopener noreferrer">v2</a>!
                    </span>
                </header>

                <NotesContainer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        users: state.userData.users,
        user: state.userData.user,
        notes: state.noteData.notes,
        notebooks: state.notebookData.notebooks,
        tags: state.tagData.tags
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    let actions = Object.assign(userActions, noteActions);
    
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
