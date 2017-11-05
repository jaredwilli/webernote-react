import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CloseBtn from './ui/CloseBtn';

import { noteNavItems, hasNotesAndOneOtherData } from '../common/noteHelpers.js';

// TODO: no need for all the actions
import * as noteActions from '../actions/noteActions';
import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';
import * as labelActions from '../actions/labelActions';

class NoteNav extends React.PureComponent {
    constructor(props) {
        super(props);

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.toggleExpanded = this.toggleExpanded.bind(this);

        // TODO: change this expand stuff
        this.state = {
            notebooks: this.props.user.notebooks,
            labels: this.props.user.labels,
            notes: this.props.user.notes,
            tags: this.props.user.tags,
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
        let { notes, notebooks, tags, labels } = this.state;

        if (!notes) {
            return <div className="loading"></div>
        }

        let coverStyles = { display: 'none' };
        let drawerMenuStyles = {};

        if (this.state.drawerOpen) {
            coverStyles = { display: 'inline-block' };
            drawerMenuStyles = { left: '-15px' };
        }

        // If this is the narrow menu, do things different
        // TODO: Make the noteNavItems a pure function
        if (this.props.show === 'narrow') {
            return (
                <div className={this.props.show + '-nav drawer-nav'}>
                    <div className="hamburger" onClick={(e) => this.toggleDrawer(e)}>
                        <i className="fa fa-bars"></i>
                    </div>

                    <div className="cover" onClick={this.toggleDrawer} style={coverStyles} />

                    <nav className="nav-col note-nav" style={drawerMenuStyles}>
                        {this.state.drawerOpen &&
                            <CloseBtn onClick={(e) => this.setState({ drawerOpen: false })} />
                        }

                        {(notebooks && notebooks.length) &&
                            <div className="notebooks-nav">
                                <ul className="notebooks top-nav-item">
                                    <li className={(this.state.expandNotebooks) ? 'expanded' : ''}>
                                        <div className="expandNotebooks" onClick={this.toggleExpanded}>
                                            Notebooks
                                        </div>
                                        <ul className="notebooks-list">
                                            {noteNavItems({ notebook: notebooks }, notes)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        }

                        {(tags && tags.length) &&
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

                        {(labels && labels.length) &&
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
            );
        }

        // TODO: fix the way i do the hamby nav and regular left nav
        let hideLeftNav = 'hidden';
        if (hasNotesAndOneOtherData(notes, notebooks, tags, labels)) {
            hideLeftNav = '';
        }

        return (
            <div className="left sidebar-nav">
                <div className={hideLeftNav + ' ' + this.props.show + '-nav drawer-nav animate'}>
                    <nav className="nav-col note-nav" style={drawerMenuStyles}>
                        {(notebooks && notebooks.length) &&
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

                        {(tags && tags.length) &&
                            <div className="tags-nav">
                                <ul className="tags top-nav-item">
                                    <li className={(this.state.expandTags) ? 'expanded' : ''}>
                                        <div className="expandTags" onClick={this.toggleExpanded}>Tags</div>
                                        <ul className="tags">
                                            {noteNavItems({ tags: tags }, notes)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        }

                        {(labels && labels.length) &&
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
        user: state.userData.user
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    let actions = Object.assign({}, noteActions, notebookActions, tagActions, labelActions);

    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteNav));
