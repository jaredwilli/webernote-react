import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NotesContainer from './notesContainer';

import UserPhoto from '../components/UserPhoto';
import IconBtn from '../components/IconBtn';

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
        this.goToGithub = this.goToGithub.bind(this);

        this.state = {
            selectedNote: '',
            notes: [],
            user: this.props.user
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.user && nextState.user) {
            return nextState.user.uid !== nextProps.user.uid;
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

    updateData() {
        this.props.actions.getNotes(this.state.user);
        this.props.actions.getNotebooks(this.state.user);
        this.props.actions.getTags(this.state.user);
        this.props.actions.getLabels(this.state.user);

        this.props.actions.listenForDeletedNotebook();
        this.props.actions.listenForDeletedTags();
        this.props.actions.listenForDeletedLabels();
    }

    goToGithub() {
        const projectUrl = 'https://github.com/jaredwilli/webernote-react';
        window.open(projectUrl);
    }

    login() {
        this.props.actions.resetSelectedNote();
        this.props.actions.loginUser(this.props.user);
        this.updateData();
    }

    logout() {
        this.props.actions.logoutUser();
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
                <div>
                    <header>
                        <div className="loginout">
                            {loginOut}
                        </div>

                        <h1><Link to="/">Webernote<sup>TM</sup></Link></h1>
                        <span>Real-time note taking. Increase your productivity!</span>
                    </header>

                    <NotesContainer login={this.login} />
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
    let actions = Object.assign(userActions, noteActions, notebookActions, tagActions, labelActions);

    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
