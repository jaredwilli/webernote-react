import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NoteList from '../components/NoteList';
import EditNote from '../components/EditNote';

import * as noteActions from '../actions/noteActions';

import '../App.css';
import '../styles/notes-container.css';

class NotesContainer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.deleteNote = this.deleteNote.bind(this);

		this.state = {
            notes: this.props.notes,
            filteredNotes: this.props.filteredNotes,
            selectedNote: this.props.selectedNote,
            filterType: 'Title',
            searchTerm: '',
			notebookFilter: {
				name: 'All notebooks',
				id: 'all_notebooks'
			}
		};
    }

    componentWillUpdate(nextProps) {
        if (nextProps.filteredNotes !== undefined) {
            this.setState({
                filteredNotes: nextProps.filteredNotes
            });
        }

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
        let { filteredNotes } = this.props;
        let notes;

        if (filteredNotes && filteredNotes.length) {
            if (this.state.notebookFilter.name || (this.state.filterType && this.state.searchTerm)) {
                notes = filteredNotes;
            }
        } else {
            notes = this.props.notes;
        }

        // Show loading if no notes yet
        if (!notes) {
			return (
				<div className="no-data"></div>
			);
        }

        return (
            <div className={(!notes.length) ? 'white notes-container' : 'notes-container'}>
                <NoteList notes={notes}
                    addNote={this.props.addNote}
                    showLoginModal={this.props.showLoginModal}
                    deleteNote={note => this.deleteNote(note)}
                    filterNotes={this.props.actions.filterNotes} />

                <EditNote notes={notes} />
            </div>
		);
	}
}

function mapStateToProps(state) {
	const newState = {
        notes: state.noteData.notes,
        filteredNotes: state.noteData.filteredNotes,
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

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
