import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNotebookCount, getTagCount, getLabelCount } from '../common/noteHelpers.js';
import { shorten } from '../common/helpers.js';

import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';
import * as labelActions from '../actions/labelActions';

import '../styles/note-nav.css';

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
            open: false
        }
    }

    toggleDrawer(e) {
        this.setState({
            open: !this.state.open
        });
    }

    burgerToggle(e) {
        e.preventDefault();

        this.setState({
            showBurgerMenu: !this.state.showBurgerMenu
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

        // NOTEBOOKS MENU
        let notebookItems = '';
        if (notebooks && notebooks.length) {
            notebookItems = notebooks.map((notebook) =>
                <li key={notebook.id} id={notebook.id}>
                    <a onClick={(e) => this.burgerToggle(e, notebook.name)}>
                        <span className="name">{shorten(notebook.name)}</span>
                    </a>&nbsp;
                    <span className="count">{getNotebookCount(notebook, notes).count}</span>
                </li>
            );
        }

        // TAGS MENU
        let tagItems = '';
        if (tags && tags.length) {
            tagItems = tags.map((tag) =>
                <li key={tag.value} value={tag.value}>
                    <a onClick={(e) => this.burgerToggle(e, tag.label)}>
                        <span className="name">{shorten(tag.label, 80)}</span>
                    </a>&nbsp;
                    <span className="count">{getTagCount(tag, notes).count}</span>
                </li>
            );
        }

        // LABELS MENU
        let labelItems = '';
        if (labels && labels.length) {
            labelItems = labels.map((label) =>
                <li key={label.id} id={label.id}>
                    <a onClick={(e) => this.burgerToggle(e, label.hex)}>
                        <div className="note-label" style={{background: label.hex}}></div>
                    </a>&nbsp;
                    <span className="count">{getLabelCount(label, notes).count}</span>
                </li>
            );
        }

        let coverStyles = {
            display: 'none'
        };
        let drawMenuStyles = {};

        if (this.state.open) {
            coverStyles = { display: 'inline-block' };
            drawMenuStyles = { left: '-15px' };
        }

        // If this is the narrow menu, do things different
        if (this.props.show === 'narrow') {
            return (
                <div className={this.props.show + '-nav drawer-nav'}>
                    <div className="hamburger" onClick={(e) => this.toggleDrawer(e)}>
                        <i className="fa fa-bars"></i>
                    </div>

                    <nav className="nav-col note-nav" style={drawMenuStyles}>
                        {this.state.open ? <span className="remove Select-clear"
                                onClick={(e) => this.setState({ open: false })}>×
                            </span>
                        : ''}

                        {(notebooks && notebooks.length) ?
                            <div className="notebooks-nav">
                                <ul className="notebooks top-nav-item">
                                    <li className={(this.state.expandNotebooks) ? 'expanded' : ''}>
                                        <div id="expandNotebooks" onClick={this.toggleExpanded}>Notebooks</div>
                                        <ul className="notebooks-list">
                                            {notebookItems}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        : ''}

                        {(tags && tags.length) ?
                            <div className="tags-nav">
                                <ul className="tags top-nav-item">
                                    <li className={(this.state.expandTags) ? 'expanded' : ''}>
                                        <div id="expandTags" onClick={this.toggleExpanded}>Tags</div>
                                        <ul className="tags">
                                            {tagItems}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        : ''}

                        {(labels && labels.length) ?
                            <div className="labels-nav">
                                <ul className="labels top-nav-item">
                                    <li className={(this.state.expandLabels) ? 'expanded' : ''}>
                                        <div id="expandLabels" onClick={this.toggleExpanded}>Labels</div>
                                        <ul className="labels">
                                            {labelItems}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        : ''}

                        <div className="cover" onClick={this.toggleDrawer} style={coverStyles} />
                    </nav>
                </div>
            );
        }

        return (
            <div>
                {(notes.length) ?
                    <div className={this.props.show + '-nav drawer-nav'}>
                        <nav className="nav-col note-nav" style={drawMenuStyles}>
                            {(notebooks && notebooks.length) ?
                                <div className="notebooks-nav">
                                    <ul className="notebooks top-nav-item">
                                        <li className={(this.state.expandNotebooks) ? 'expanded' : ''}>
                                            <div id="expandNotebooks" onClick={this.toggleExpanded}>Notebooks</div>
                                            <ul className="notebooks-list">
                                                {notebookItems}
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            : ''}

                            {(tags && tags.length) ?
                                <div className="tags-nav">
                                    <ul className="tags top-nav-item">
                                        <li className={(this.state.expandTags) ? 'expanded' : ''}>
                                            <div id="expandTags" onClick={this.toggleExpanded}>Tags</div>
                                            <ul className="tags">
                                                {tagItems}
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            : ''}

                            {(labels && labels.length) ?
                                <div className="labels-nav">
                                    <ul className="labels top-nav-item">
                                        <li className={(this.state.expandLabels) ? 'expanded' : ''}>
                                            <div id="expandLabels" onClick={this.toggleExpanded}>Labels</div>
                                            <ul className="labels">
                                                {labelItems}
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            : ''}
                        </nav>
                    </div>
                : ''}
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

export default connect(mapStateToProps, mapDispatchToProps)(NoteNav);
