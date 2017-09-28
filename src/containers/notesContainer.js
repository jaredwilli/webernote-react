import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { auth, fbProvider } from '../data/firebaseAuth.js';

import NoteNav from '../components/NoteNav';
import NoteTypes from '../components/NoteTypes';

import NoteList from '../components/NoteList';
import EditNote from '../components/EditNote';
import AddNote from '../components/AddNote';

import * as noteActions from '../actions/noteActions';

import '../App.css';

class NotesContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.addNote = this.addNote.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        
        this.state = {
            selectedNote: '',
            notes: [],
            username: '',
            user: null
        }
    }
    
    addNote(e) {
        e.preventDefault();

        this.props.actions.resetSelectedNote();
        this.props.actions.addNote();
    }

    componentWillMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }

    login() {
        auth.signInWithPopup(fbProvider)
            .then((res) => {
                const user = res.user;

                this.setState({
                    user: user
                });
            });
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    render() {
        if (!this.props.notes) {
            return (
                <div className="loading">Loading...</div>
            );
        }

        return (
            <div>
                <header>
                    <div className="loginout">
                        {this.state.user ?
                            <div>
                                <span className="user-photo">
                                    <img src={this.state.user.photoURL} />
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
                <div className="wrapper">
                    <nav className="toolbar">
                        <ul>
                            <li><a href="">File</a></li>
                            <li><a href="">Edit</a></li>
                            <li><a href="">View</a></li>
                            <li><a href="">Note</a></li>
                            <li><a href="">Tools</a></li>
                            <li><a href="">Help</a></li>
                            <li className="new-note">
                                <AddNote addNote={(e) => this.addNote(e)} />
                            </li>
                        </ul>
                    </nav>
                    <nav className="note-types">
                        <NoteTypes />
                    </nav>
                    <table id="resizable" className="resizable">
                        <tbody>
                            <tr>
                                <td>
                                    <NoteNav />
                                </td>
                                <td className="middle note-list-col">
                                    <NoteList />
                                </td>
                                <td className="edit-note-col">
                                    <EditNote />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        notes: state.noteData.notes,
        selectedNote: state.noteData.selectedNote,
        notebooks: state.notebookData.notebooks,
        tags: state.tagData.tags
    };
    console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(noteActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
