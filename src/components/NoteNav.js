import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { hasNotesAndOneOtherData } from '../common/noteHelpers.js';

import NavList from './ui/NavList';

import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';
import * as labelActions from '../actions/labelActions';

class NoteNav extends React.Component {
    constructor(props) {
        super(props);

        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(e) {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    render() {
        let { notes, notebooks, tags, labels } = this.props;

        if (!notes) {
            return <div className="no-notes"></div>;
        }

        // Hide the note nav unless there are at least one type of taxonomy applied to a note
        let hideLeftNav = 'hidden';
        if (hasNotesAndOneOtherData(this.props)) {
            hideLeftNav = 'visible';
        }

        return (
            <div className="left sidebar-nav">
                <div className={hideLeftNav + ' wide-nav drawer-nav'}>
                    <nav className="nav-col note-nav">
                        {(notebooks && notebooks.length > 0) &&
                            <NavList
                                items={notebooks}
                                notes={notes}
                                type="notebooks" />
                        }
                        {(labels && labels.length > 0) &&
                            <NavList
                                items={labels}
                                notes={notes}
                                type="labels" />
                        }
                        {(tags && tags.length > 0) &&
                            <NavList
                                items={tags}
                                notes={notes}
                                type="tags" />
                        }
                    </nav>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        notes: state.noteData.notes,
        notebooks: state.notebookData.notebooks,
        tags: state.tagData.tags,
        labels: state.labelData.labels
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    let actions = Object.assign({}, notebookActions, tagActions, labelActions);

    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteNav));
