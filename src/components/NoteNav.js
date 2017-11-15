import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { noteNavItems, hasNotesAndOneOtherData } from '../common/noteHelpers.js';

import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';
import * as labelActions from '../actions/labelActions';

class NoteNav extends React.Component {
    constructor(props) {
        super(props);

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.toggleExpanded = this.toggleExpanded.bind(this);

        this.state = {
            showBurgerMenu: false,
            expandNotebooks: true,
            expandTags: true,
            expandLabels: true,
            drawerOpen: false
        }
    }

    toggleDrawer(e) {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    toggleExpanded(e) {
        let current = this.state;

        this.setState({
            [e.target.id]: !current[e.target.id]
        });
    }

    render() {
        let { notes, notebooks, tags, labels } = this.props;

        if (!notes) {
            return <div className="loading"></div>
        }

        let hideLeftNav = 'hidden';
        if (hasNotesAndOneOtherData(this.props)) {
            hideLeftNav = '';
        }

        return (
            <div className="left sidebar-nav">
                <div className={hideLeftNav + ' ' + this.props.show + '-nav drawer-nav animate'}>
                    <nav className="nav-col note-nav">
                        {(notebooks && notebooks.length > 0) &&
                            <div className="notebooks-nav">
                                <ul className="notebooks top-nav-item">
                                    <li className={(this.state.expandNotebooks) ? 'expanded' : ''}>
                                        <div className="expandNotebooks" onClick={this.toggleExpanded}>Notebooks</div>
                                        <ul className="notebooks-list">
                                            {noteNavItems({ notebook: notebooks }, notes)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        }

                        {(tags && tags.length > 0) &&
                            <div className="tags-nav">
                                <ul className="tags top-nav-item">
                                    <li className={(this.state.expandTags) ? 'expanded' : ''}>
                                        <div className="expandTags" onClick={this.toggleExpanded}>Tags</div>
                                        <ul className="tags">
                                            {noteNavItems({ tags }, notes)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        }

                        {(labels && labels.length > 0) &&
                            <div className="labels-nav">
                                <ul className="labels top-nav-item">
                                    <li className={(this.state.expandLabels) ? 'expanded' : ''}>
                                        <div className="expandLabels" onClick={this.toggleExpanded}>Labels</div>
                                        <ul className="labels">
                                            {noteNavItems({ label: labels }, notes)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
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
