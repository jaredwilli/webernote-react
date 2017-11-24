import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WelcomeMsg from './stateless/WelcomeMsg';
import SearchFilter from './SearchFilter';
import ViewCount from './ViewCount';
import Note from './Note';

import * as noteActions from '../actions/noteActions';

class NoteList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.selectNote = this.selectNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.filterNotes = this.filterNotes.bind(this);
        this.clearFilters = this.clearFilters.bind(this);

        this.state = {
            windowWidth: window.innerWidth,
            filterType: 'Title',
            searchTerm: '',
			notebookFilter: {
				name: 'All notebooks',
				id: 'all_notebooks'
            },
            sort: {
                order: 'desc',
                sortBy: 'created_date'
            }
        };
    }

    componentDidMount() {
        this.onWindowResize();
        window.addEventListener('resize', this.onWindowResize);
    }

    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize = () => {
        this.setState({ width: window.innerWidth });
    };

    clearFilters() {
        this.setState({
            filterType: 'Title',
            searchTerm: '',
            notebookFilter: {
                name: 'All notebooks',
                id: 'all_notebooks'
            }
        }, () => this.props.filterNotes());
    }

    filterNotes(filter) {
        if (filter) {
            this.setState(filter, () => {
                let filterVals = {};
                const { notebookFilter, filterType, searchTerm } = this.state;

                if (filterType && searchTerm) {
                    filterVals.type = filterType;
                    filterVals.term = searchTerm;
                } else if (notebookFilter) {
                    filterVals.notebook = notebookFilter;
                }

                this.props.filterNotes(filterVals);
            });
        } else {
            this.clearFilters();
        }
    }

    selectNote(event, note) {
        if (event.target.className !== 'close') {
            this.props.actions.resetSelectedNote();
            this.props.actions.selectNote(note);
        }
    }

    deleteNote(note) {
        this.props.deleteNote(note);
    }

    render() {
        const { notes, notebooks = [] } = this.props;
        const { filterType, searchTerm, notebookFilter, width } = this.state;
        // TODO: Move this to a higher order component
        const isMobile = width <= 690;

        // Handle when theres no notes
        // TODO: Use the ZeroNotes component here instead once its tested
        if (!notes.length) {
            if (searchTerm.length === 0 && notebookFilter.id === 'all_notebooks') {
                return (
                    <WelcomeMsg
                        addNote={this.props.addNote}
                        showLoginModal={this.props.showLoginModal} />
                );
            }
        }

        return (
            <div className="middle list-col note-list">
                <div className="filters">
                    <div className="filter">
                        <SearchFilter
                            notes={notes}
                            filterType={filterType}
                            searchTerm={searchTerm}
                            onChange={this.filterNotes}
                            clearFilters={this.clearFilters} />
                    </div>

                    {(notebooks.length > 0) &&
                        <div className="viewing">
                            <ViewCount
                                notes={notes}
                                notebooks={notebooks}
                                notebookFilter={notebookFilter}
                                onChange={this.filterNotes} />
                        </div>
                    }
                </div>

                {!notes.length && <div className="empty">No notes to show...</div>}

                {notes.length &&
                    <Note
                        notes={notes}
                        sort={this.state.sort}
                        selectNote={(event, note) => this.selectNote(event, note)}
                        deleteNote={(note) => this.deleteNote(note)}
                        isMobile={isMobile} />
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        notebooks: state.notebookData.notebooks,
        tags: state.tagData.tags
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(noteActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteList));
