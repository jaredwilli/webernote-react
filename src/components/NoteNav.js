import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    getObjCounts, getNotebookCount, getTagCount, getLabelCount,
    noteNavItems, hasNotesAndOneOtherData
} from '../common/noteHelpers.js';
import { shorten } from '../common/helpers.js';

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

        // NOTEBOOKS MENU
        // let notebookItems = '';
        // if (notebooks && notebooks.length) {
        //     notebookItems = notebooks.map((notebook) =>
        //         <li key={notebook.id} id={notebook.id}>
        //             <Link to={`/notebooks/${notebook.name.toLowerCase()}`}>
        //                 <span className="name">{shorten(notebook.name)}</span>
        //             </Link>&nbsp;
        //             <span className="count">{getObjCounts({ notebook }, notes).count}</span>
        //         </li>
        //     );
        // }

        // // TAGS MENU
        // let tagItems = '';
        // if (tags && tags.length) {
        //     tagItems = tags.map((tag) =>
        //         <li key={tag.value} value={tag.value}>
        //             <Link to={`/tags/${tag.label.toLowerCase()}`}>
        //                 <span className="name">{shorten(tag.label, 80)}</span>
        //             </Link>&nbsp;
        //             <span className="count">{getObjCounts({ tags: tag }, notes).count}</span>
        //         </li>
        //     );
        // }

        // // LABELS MENU
        // let labelItems = '';
        // if (labels && labels.length) {
        //     labelItems = labels.map((label) =>
        //         <li key={label.id} id={label.id}>
        //             <Link to={`/labels/${label.name.toLowerCase()}`}>
        //                 <div className="note-label" style={{background: label.hex}} />
        //                 <span className="name">{label.name}</span>
        //             </Link>&nbsp;
        //             <span className="count">{getObjCounts({ label }, notes).count}</span>
        //         </li>
        //     );
        // }


        let coverStyles = { display: 'none' };
        let drawerMenuStyles = {};

        if (this.state.drawerOpen) {
            coverStyles = { display: 'inline-block' };
            drawerMenuStyles = { left: '-15px' };
        }

        // If this is the narrow menu, do things different
        if (this.props.show === 'narrow') {
            return (
                <div className={this.props.show + '-nav drawer-nav'}>
                    <div className="hamburger" onClick={(e) => this.toggleDrawer(e)}>
                        <i className="fa fa-bars"></i>
                    </div>

                    <div className="cover" onClick={this.toggleDrawer} style={coverStyles} />

                    <nav className="nav-col note-nav" style={drawerMenuStyles}>
                        {this.state.drawerOpen ? <span className="remove Select-clear"
                                onClick={(e) => this.setState({ drawerOpen: false })}>×
                            </span>
                        : ''}

                        {(notebooks && notebooks.length) ?
                            <div className="notebooks-nav">
                                <ul className="notebooks top-nav-item">
                                    <li className={(this.state.expandNotebooks) ? 'expanded' : ''}>
                                        <div class="expandNotebooks" onClick={this.toggleExpanded}>
                                            Notebooks
                                        </div>
                                        <ul className="notebooks-list">
                                            {noteNavItems({ notebook: notebooks }, notes)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        : ''}

                        {(tags && tags.length) ?
                            <div className="tags-nav">
                                <ul className="tags top-nav-item">
                                    <li className={(this.state.expandTags) ? 'expanded' : ''}>
                                        <div class="expandTags" onClick={this.toggleExpanded}>Tags</div>
                                        <ul className="tags">
                                            {noteNavItems({ tags: tags }, notes)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        : ''}

                        {(labels && labels.length) ?
                            <div className="labels-nav">
                                <ul className="labels top-nav-item">
                                    <li className={(this.state.expandLabels) ? 'expanded' : ''}>
                                        <div class="expandLabels" onClick={this.toggleExpanded}>Labels</div>
                                        <ul className="labels">
                                            {noteNavItems({ label: labels }, notes)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        : ''}
                    </nav>
                </div>
            );
        }

        let hideLeftNav = 'hidden';
        if (hasNotesAndOneOtherData(this.props)) {
            hideLeftNav = '';
        }

        return (
            <div className="left sidebar-nav">
                <div className={hideLeftNav + ' ' + this.props.show + '-nav drawer-nav animate'}>
                    <nav className="nav-col note-nav" style={drawerMenuStyles}>
                        {(notebooks && notebooks.length) ?
                            <div className="notebooks-nav">
                                <ul className="notebooks top-nav-item">
                                    <li className={(this.state.expandNotebooks) ? 'expanded' : ''}>
                                        <div class="expandNotebooks" onClick={this.toggleExpanded}>Notebooks</div>
                                        <ul className="notebooks-list">
                                            {noteNavItems({ notebook: notebooks }, notes)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        : ''}

                        {(tags && tags.length) ?
                            <div className="tags-nav">
                                <ul className="tags top-nav-item">
                                    <li className={(this.state.expandTags) ? 'expanded' : ''}>
                                        <div class="expandTags" onClick={this.toggleExpanded}>Tags</div>
                                        <ul className="tags">
                                            {noteNavItems({ tags: tags }, notes)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        : ''}

                        {(labels && labels.length) ?
                            <div className="labels-nav">
                                <ul className="labels top-nav-item">
                                    <li className={(this.state.expandLabels) ? 'expanded' : ''}>
                                        <div class="expandLabels" onClick={this.toggleExpanded}>Labels</div>
                                        <ul className="labels">
                                            {noteNavItems({ label: labels }, notes)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        : ''}
                    </nav>
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
