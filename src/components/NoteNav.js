import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNotebookCount, getTagCount, filterData } from '../common/noteHelpers.js';
import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';


class NoteNav extends React.Component {
    constructor(props) {
        super(props);

        this.toggleExpanded = this.toggleExpanded.bind(this);

        this.state = {
            expandNotebooks: true,
            expandTags: true
        }
    }

    toggleExpanded(e) {
        let current = this.state;

        this.setState({
            [e.target.id]: !current[e.target.id]
        });
    }

    render() {
        const user = this.props.user;
        let { notes, notebooks, tags } = this.props;

        // Filter notes for user or not
        notes = filterData(user, notes);

        // NOTEBOOKS MENU
        let notebookItems = '';

        if (notebooks && notebooks.length) {
            // Filter user notebooks
            notebooks = filterData(user, notebooks);

            notebookItems = notebooks.map((notebook) =>
                <li key={notebook.id} id={notebook.id}>
                    <a href={'#/' + notebook.name}>
                        <span className="name">{notebook.name}</span>
                    </a>&nbsp;
                    <span className="count">{getNotebookCount(notebook, notes).count}</span>
                </li>
            );
        }

        // TAGS MENU
        let tagItems = '';

        if (tags && tags.length) {
            // Filter user tags
            tags = filterData(user, tags);

            tagItems = tags.map((tag) =>
                <li key={tag.value} value={tag.value}>
                    <a href={'#/' + tag.label}>
                        <span className="name">{tag.label}</span>
                    </a>&nbsp;
                    <span className="count">{getTagCount(tag, notes).count}</span>
                </li>
            );
        }

        return (
            <div id="note-nav" className="left-nav">
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        user: state.userData.user,
        notes: state.noteData.notes,
        notebooks: state.notebookData.notebooks,
        tags: state.tagData.tags
    };
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(notebookActions, tagActions, dispatch)
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
