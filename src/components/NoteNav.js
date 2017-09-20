import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as notebookActions from '../actions/notebookActions';
import * as tagActions from '../actions/tagActions';

import { getNotebookCount, getTagCount } from '../common/helpers.js';

class NoteNav extends React.Component {
    constructor(props) {
        super(props);
    }
    
    /* function toggleExpanded(expanded) {
        if (this.props.notebooks.length > 0) {
            expanded = 'expanded';
        }
        return expanded;
    } */

    getNotebooksMenu(notebooks) {
        let notebookItems = '';

        notebookItems = notebooks.map((notebook) => 
            <li key={notebook.id} id={notebook.id}>
                <a href={'#/' + notebook.name}>
                    <span className="name">{notebook.name}</span>
                </a>&nbsp;
                <span className="count">{getNotebookCount(this.props.notes, notebook)}</span>
            </li>
        );
        return notebookItems;
    }

    getTagsMenu(tags) {
        let tagItems = '';

        tagItems = tags.map((tag) =>
            <li key={tag.id} value={tag.id}>
                <a href={'#/' + tag.label}>
                    <span className="name">{tag.label}</span>
                </a>&nbsp;
                <span className="count">{getTagCount(this.props.notes, tag)}</span>
            </li>
        );
        return tagItems;
    }

    render() {
        const { notebooks, tags } = this.props;
        let notebookItems, tagItems;

        // NOTEBOOKS MENU
        let expandNotebookMenu = (notebooks && notebooks.length > 0) ? 'expanded' : '';

        if (notebooks && notebooks.length) {
            notebookItems = this.getNotebooksMenu(notebooks);
        }
        
        // TAGS MENU
        let expandTagsMenu = (tags && tags.length > 0) ? 'expanded' : '';

        if (tags && tags.length) {
            tagItems = this.getTagsMenu(tags);
        }
    
        return (
            <div id="note-nav" className="left-nav">
                <ul id="notebooks" className="top-nav-item">
                    <li className={expandNotebookMenu}>
                        <span>Notebooks</span>
                        <ul className="notebooks">
                            {notebookItems}
                        </ul>
                    </li>
                </ul>

                <ul id="tags" className="top-nav-item">
                    <li className={expandTagsMenu}>
                        <span>Tags</span>
                        <ul className="tags">
                            {tagItems}
                        </ul>
                    </li>

                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        notes: state.noteData.notes,
        notebooks: state.notebookData.notebooks,
        tags: state.tagData.tags
    };
    console.log('STATE: ', state, newState);

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
