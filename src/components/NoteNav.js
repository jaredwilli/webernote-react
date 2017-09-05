import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActions from '../actions/noteActions';
import { getNotebookCount } from '../common/helpers.js';

function NoteNav(props) {
    const { notebooks } = this.props;
    let notebookLinks = '';

    function toggleExpanded(expanded) {
        expanded = !!expanded;

        if (this.props.notebooks.length > 0) {
            expanded = 'expanded';
        }

        return expanded;
    }

    if (notebooks && notebooks.length) {
        notebookLinks = notebooks.map((notebook) =>
            <li key={notebook.id} id={notebook.id}>
                <a href={'/' + notebook.name}>
                    <span className="name">{notebook.name}</span>
                </a>
                <span className="count">{getNotebookCount(this.props.notes, notebook)}</span>
            </li>
        );
    }
    
    return (
        <div id="note-nav" className="left-nav">
            <ul id="notebooks" className="top-nav-item">
                <li className={(toggleExpanded()) ? 'expanded' : ''}>
                    <a href="">Notebooks</a>
                    <ul className="notebooks">
                        {notebookLinks}
                    </ul>
                </li>
            </ul>
            <ul id="tags">
                <li><a href="">Tags</a>
                    <ul className="tags hidden">
                        <li id="tag-tagId" className="tag-link">
                            <a href="?tag=tagId">
                                <span className="name">tagId</span>
                            </a>
                            <span className="count">noteCount</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <ul id="attributes">
                <li><a href="">Attributes</a>
                    <ul id="created" className="attributes hidden">
                        <li><a href="">Created</a>
                            <ul className="created hidden">
                                <li id="create-createdId">
                                    <a href="#since">Since</a>
                                </li>
                                <li>
                                    <a href="#before">Before</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul id="modified" className="attributes hidden">
                        <li><a href="">Last Modified</a>
                            <ul className="modified hidden">
                                <li id="modified-modifiedId">
                                    <a href="#since">Since</a>
                                </li>
                                <li>
                                    <a href="#before">Before</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul id="contains" className="attributes hidden">
                        <li><a href="">Contains</a>
                            <ul className="contains hidden">
                                <li id="contains-containsId">
                                    <a href="#since">Since</a>
                                </li>
                                <li>
                                    <a href="#before">Before</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul id="source" className="attributes hidden">
                        <li><a href="">Source</a>
                            <ul className="source hidden">
                                <li id="source-sourceId">
                                    <a href="#since">Since</a>
                                </li>
                                <li>
                                    <a href="#before">Before</a>
                                </li>
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
                <li>
                    <a href="#trash">Trash</a>
                </li>
            </ul>
        </div>
    );
}

export default NoteNav;
