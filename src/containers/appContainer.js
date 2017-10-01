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
        let self = this;

        auth.onAuthStateChanged((user) => {
            if (user) {
                debugger
                self.props.actions.getUser(user);

                self.setState({ 
                    user: self.props.user 
                });
            }
        });
    }

    login() {
        let self = this;

        auth.signInWithPopup(fbProvider)
            .then((res) => {
                let user = res.user;
                self.props.actions.getUser(user);
debugger
                if (!user) {
                    self.props.actions.addUser(user);
                }
                
                self.setState({ 
                    user: self.props.user 
                });
                
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
        // if (this.props.user) {
            
        // }

        return (
            <div>
                <header>
                    <div className="loginout">
                        {this.props.user ?
                            <div className="user-menu">
                                <span className="user-photo">
                                    <img src={this.props.user.photo} />
                                </span>
                                <a href className="logout" onClick={this.logout}>Logout</a>
                            </div>
                        :
                            <a href className="login" onClick={this.login}>Login</a>
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
        user: state.userData.user
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
