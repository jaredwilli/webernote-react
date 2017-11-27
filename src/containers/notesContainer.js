import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import NoteList from '../components/NoteList';
import EditNote from '../components/EditNote';

import * as noteActions from '../actions/noteActions';

class NotesContainer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.deleteNote = this.deleteNote.bind(this);

		this.state = {
            notes: this.props.notes
		};
    }

    componentWillUpdate(nextProps) {
        if (nextProps.notes !== undefined) {
            this.setState({
                notes: nextProps.notes
            });
        }
    }

	deleteNote(note) {
        // I might not want to auto select first note on delete
        // this.props.actions.resetSelectedNote();
		this.props.actions.deleteNote(note);
	}

	render() {
        const { notes, selectedNote } = this.props;

        if (!notes) {
			return (
				<div className="empty"></div>
			);
        }

        return (
            <div className={(!notes.length) ? 'white notes-container' : 'notes-container'}>
                <NoteList notes={notes}
                    addNote={this.props.addNote}
                    showLoginModal={this.props.showLoginModal}
                    deleteNote={note => this.deleteNote(note)}
                    filterNotes={this.props.actions.filterNotes} />

                {selectedNote &&
                    <EditNote
                        notes={notes}
                        selectedNote={selectedNote} />
                }
            </div>
		);
	}
}

function mapStateToProps(state) {
	const newState = {
        notes: state.noteData.notes,
		selectedNote: state.noteData.selectedNote
	};
	// console.log('STATE: ', state, newState);

	return newState;
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(noteActions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotesContainer));
