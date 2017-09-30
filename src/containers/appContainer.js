import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { auth, fbProvider } from '../data/firebaseAuth.js';

import NotesContainer from './notesContainer.js';

import * as userActions from '../actions/userActions';

import '../App.css';

class AppContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = {
            selectedNote: '',
            notes: [],
            username: '',
            user: null
        }
    }

    componentWillMount() {
        auth.onAuthStateChanged((user) => {
            if (user && this.props.users) {
                this.props.actions.getUser(user);
                this.setState({ user: this.props.user });
            }
        });
    }

    login() {
        let self = this;

        auth.signInWithPopup(fbProvider)
            .then((res) => {
                let user = res.user;

                if (self.props.users) {
                    self.props.actions.getUser(user);
                    
                    if (!user) {
                        self.props.actions.addUser(user);
                    }
                    
                    self.setState({ user: self.props.user });
                } else {
                    console.log('no users');
                    
                }

            });
    }

    logout() {
        let self = this;

        auth.signOut()
            .then(() => {
                self.setState({
                    user: null
                });

                self.props.actions.logoutUser();
            });
    }

    render() {
        if (!this.props.users) {
            console.log('NO USERS');
        }

        return (
            <div>
                <header>
                    <div className="loginout">
                        {this.props.user ?
                            <div className="user-menu">
                                <span className="user-photo">
                                    <img src={this.props.user.photo} />
                                </span>
                                <button className="logout" onClick={this.logout}>Logout</button>
                            </div>
                        :
                            <button className="login" onClick={this.login}>Login</button>
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
        users: state.userData.users
    };
    console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
