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

        this.toggleExpanded = this.toggleExpanded.bind(this);

        this.state = {
            expandNotebooks: true,
            expandTags: true,
            expandLabels: true
        }
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
                    <a href={'#/' + notebook.name}>
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
                    <a href={'#/' + tag.label}>
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
                    <a href={'#/' + label.hex}>
                        <div className="note-label" style={{background: label.hex}}></div>
                    </a>&nbsp;
                    <span className="count">{getLabelCount(label, notes).count}</span>
                </li>
            );
        }

        return (
            <div className="note-nav">
                {(notebooks && notebooks.length) ?
                    <nav className="notebooks-nav">
                        <ul className="notebooks top-nav-item">
                            <li className={(this.state.expandNotebooks) ? 'expanded' : ''}>
                                <div id="expandNotebooks" onClick={this.toggleExpanded}>Notebooks</div>
                                <ul className="notebooks">
                                    {notebookItems}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                : ''}

                {(tags && tags.length) ?
                    <nav className="notebooks-nav">
                        <ul className="tags top-nav-item">
                            <li className={(this.state.expandTags) ? 'expanded' : ''}>
                                <div id="expandTags" onClick={this.toggleExpanded}>Tags</div>
                                <ul className="tags">
                                    {tagItems}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                : ''}

                {(labels && labels.length) ?
                    <nav className="labels-nav">
                        <ul className="labels top-nav-item">
                            <li className={(this.state.expandLabels) ? 'expanded' : ''}>
                                <div id="expandLabels" onClick={this.toggleExpanded}>Labels</div>
                                <ul className="labels">
                                    {labelItems}
                                </ul>
                            </li>
                        </ul>
                    </nav>
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


/**
 * TO BE ADDED MAYBE LATER???


    <ul id="attributes">
        <li><a href="">Attributes</a>
            <ul id="created" className="attributes hidden">
                <li><a href="">Created</a>
                    <ul className="created hidden">
                        <li id="create-createdId"><a href="">Since</a></li>
                        <li><a href="">Before</a></li>
                    </ul>
                </li>
            </ul>
            <ul id="modified" className="attributes hidden">
                <li><a href="">Last Modified</a>
                    <ul className="modified hidden">
                        <li id="modified-modifiedId"><a href="">Since</a></li>
                        <li><a href="">Before</a></li>
                    </ul>
                </li>
            </ul>
            <ul id="contains" className="attributes hidden">
                <li><a href="">Contains</a>
                    <ul className="contains hidden">
                        <li id="contains-containsId"><a href="">Since</a></li>
                        <li><a href="">Before</a></li>
                    </ul>
                </li>
            </ul>
            <ul id="source" className="attributes hidden">
                <li><a href="">Source</a>
                    <ul className="source hidden">
                        <li id="source-sourceId"><a href="">Since</a></li>
                        <li><a href="">Before</a></li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
    <ul id="searches">
        <li><a href="">Saved&nbsp;Searches</a>
            <ul className="searches hidden">
            </ul>
        </li>
    </ul>
    <ul className="trash">
        <li><a href="">Trash</a></li>
    </ul>
*/
