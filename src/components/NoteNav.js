import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActions from '../actions/noteActions';

class NoteNav extends Component {
    render() {
        // const bookLinks = this.props.notebooks.map((note) =>
        //     <li id="notebook-notebookId">
        //         <a href="">
        //             <span className="name">{note.name}</span>
        //         </a>
        //         <span className="count">({this.props.notebooks.length})</span>
        //     </li>
        // );
        // debugger
        return (
            <div id="note-nav">
                <ul id="notebooks">
                    <li><a href="#">Notebooks</a>
                        <ul className="notebooks">
                            
                        </ul>
                    </li>
                </ul>
                <ul id="tags">
                    <li><a href="#">Tags</a>
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
                    <li><a href="#">Attributes</a>
                        <ul id="created" className="attributes hidden">
                            <li><a href="#">Created</a>
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
                            <li><a href="#">Last Modified</a>
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
                            <li><a href="#">Contains</a>
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
                            <li><a href="#">Source</a>
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
                    <li><a href="#">Saved&nbsp;Searches</a>
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
}

function mapStateToProps(state) {
    const newState = {
        notes: state.noteData.notes,
        selectedNote: state.noteData.selectedNote
    };
    
    // console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(noteActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteNav);
