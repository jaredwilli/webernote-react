import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WelcomeMsg from './stateless/WelcomeMsg';
import SearchFilter from './SearchFilter';
import ViewCount from './ViewCount';
import Note from './Note';

import * as noteActions from '../actions/noteActions';

class NoteList extends Component {
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

    componentWillMount() {
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
                const { notebook, type, term } = this.state;

                console.log(notebook, type, term);
                debugger;
                if (filter.filterType || filter.searchTerm) {
                    filterVals.type = this.state.filterType;
                    filterVals.term = filter.searchTerm;
                } else if (filter.notebookFilter) {
                    filterVals.notebook = filter.notebookFilter;
                }

                this.props.filterNotes(filterVals);
            });
        } else {
            this.clearFilters();
        }
    }

    selectNote(note) {
        this.props.actions.resetSelectedNote();
        this.props.actions.selectNote(note);
    }

    deleteNote(note) {
        this.props.deleteNote(note);
    }

    render() {
        const { notes, notebooks } = this.props;
        const { width } = this.state;
        const isMobile = width <= 690;

        if (!notes.length) {
            return (
                <WelcomeMsg
                    addNote={this.props.addNote}
                    showLoginModal={this.props.showLoginModal} />
            );
        }

        return (
            <div className="middle list-col note-list">
                <div className="filters">
                    <div className="filter">
                        <SearchFilter
                            notes={notes}
                            filterType={this.state.filterType}
                            searchTerm={this.state.searchTerm}
                            onChange={this.filterNotes}
                            clearFilters={this.clearFilters} />
                    </div>

                    {(notebooks && notebooks.length > 0) &&
                        <div className="viewing">
                            <ViewCount
                                notes={notes}
                                notebooks={notebooks}
                                notebookFilter={this.state.notebookFilter}
                                onChange={this.filterNotes} />
                        </div>
                    }
                </div>

                <Note notes={notes}
                    sort={this.state.sort}
                    selectNote={(e, note) => this.selectNote(note)}
                    deleteNote={this.deleteNotenote}
                    isMobile={isMobile} />
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
