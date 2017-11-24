import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Mousetrap from 'mousetrap';

import NotesContainer from '../../containers/notesContainer';
import NoteNav from '../../components/NoteNav';

import * as userActions from '../../actions/userActions';
import * as noteActions from '../../actions/noteActions';
import * as notebookActions from '../../actions/notebookActions';
import * as tagActions from '../../actions/tagActions';
import * as labelActions from '../../actions/labelActions';
import * as modalActions from '../../actions/modalActions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            selectedNote: '',
            notes: []
        };
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
        Mousetrap.bind(['ctrl+n'], (event) => this.addNote(event));
        Mousetrap.bind(['cmd+b'], (event) => this.toggleNoteNav(event));
    }

    componentWillUnmount() {
        Mousetrap.unbind(['ctrl+n'], (event) => this.addNote(event));
        Mousetrap.unbind(['cmd+b'], (event) => this.toggleNoteNav(event));
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

    render() {
        console.log(this.props);
        console.log(this.state);
        console.log('HomePage.js');
        debugger;

        return (
            <div className="main">
                <NoteNav />

                <NotesContainer
                    showLoginModal={this.showLoginModal}
                    addNote={this.addNote} />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
