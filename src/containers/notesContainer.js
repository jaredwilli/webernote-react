import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactLoading from 'react-loading';

import Toolbar from '../components/Toolbar';
import NoteNav from '../components/NoteNav';
import NoteTypes from '../components/NoteTypes';

import NoteList from '../components/NoteList';
import EditNote from '../components/EditNote';

import * as noteActions from '../actions/noteActions';
import { filterData } from '../common/noteHelpers';

import '../App.css';
import '../styles/note-types.css';

class NotesContainer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.addNote = this.addNote.bind(this);
		this.deleteNote = this.deleteNote.bind(this);

		this.filterList = this.filterList.bind(this);
		this.setFilterType = this.setFilterType.bind(this);
		this.filterByNotebook = this.filterByNotebook.bind(this);

		this.state = {
            user: this.props.user,
            notes: this.props.notes,
            selectedNote: this.props.selectedNote,
            filterType: 'Title',
            searchTerm: '',
			notebookFilter: {
				name: 'All notebooks',
				id: 'all_notebooks'
			}
		};
    }

	setFilterType(e) {
        if (e) {
            this.setState({
                filterType: e.target.name
            }, () => {
                if (this.state.searchTerm) {
                    this.filterList()
                }
            });
        }
	}

	filterList(e) {
		let val = e.target.value;

        if (val) {
            this.props.notes.find((note) => {
                return note[this.state.filterType].toLowerCase().search(val.toLowerCase()) !== -1;
            });

            this.setState({
                searchTerm: val
            });
        }
    }

    filterByNotebook(notebook) {
		this.props.actions.resetSelectedNote();
		this.setState({
			notebookFilter: notebook
		}, () => {

        });
    }

	addNote(e) {
		this.props.actions.resetSelectedNote();
		this.props.actions.addNote();
	}

	deleteNote(note) {
		// this.props.actions.resetSelectedNote(); // i might not want to auto select first note on delete
		this.props.actions.deleteNote(note);
	}

	render() {
        let notes = this.props.notes;

        if (!notes) {
			return (
				<div className="big-loader">
					<ReactLoading
                        className="loader"
                        type="spinningBubbles"
                        color="#2196f3"
                        height="400px"
                        width="200px" />
				</div>
			);
        }


        // Filter notes by notebookFilter
        // notes = notes.filter((n) => {
        //     if (n.notebook && this.state.notebookFilter.name !== 'All notebooks') {
        //         return n.notebook.id === this.state.notebookFilter.id;
        //     }
        // });

        // debugger;

        return (
            <div className="wrapper">
                <Toolbar addNote={this.addNote} />

                <nav className="note-types">
                    <NoteTypes />
                </nav>

                <div className="notes-container">
                    <NoteNav show="wide" />

                    <NoteList notes={notes}
                        addNote={this.addNote}
                        login={this.props.login}
                        deleteNote={note => this.deleteNote(note)}
                        filterByNotebook={notebook => this.filterByNotebook(notebook)}
                        filterList={filter => this.filterList(filter)}
                        setFilterType={type => this.setFilterType(type)} />

                    <EditNote notes={notes} />
                </div>
            </div>
		);
	}
}

function mapStateToProps(state) {
	const newState = {
		user: state.userData.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
