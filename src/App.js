import React, { Component } from 'react';
import NoteList from './components/NoteList.js';
import EditNote from './components/EditNote.js';
import NewNote from './components/NewNote.js';

import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <div id="loginout">
                        <a id="login" href="#">Login</a>
                    </div>
                    <h1><a href="#">Webernote</a></h1>
                </header>
                <div id="pagewrap">
                    <nav id="toolbar">
                        <ul>
                            <li><a href="#">File</a></li>
                            <li><a href="#">Edit</a></li>
                            <li><a href="#">View</a></li>
                            <li><a href="#">Note</a></li>
                            <li><a href="#">Tools</a></li>
                            <li><a href="#">Help</a></li>
                            <li className="new-note">
                                <NewNote />
                            </li>
                        </ul>
                    </nav>
                    <nav id="note-types">
                        <ul>
                            <li><a href="#">All Notes</a></li>
                            <li><a href="#">Notebooks</a></li>
                            <li><a href="#">Tags</a></li>
                            <li><em>For quick access, drag notes, notebooks and tags here</em></li>
                        </ul>
                    </nav>
                    <table id="resizable">
                        <tbody>
                            <tr>
                                <td>
                                    <div id="note-nav">
                                        <ul id="notebooks">
                                            <li><a href="#">Notebooks</a>
                                                <ul className="notebooks">
                                                    <li id="notebook-notebookId">
                                                        <a href="?notebook=notebookId">
                                                            <span className="name">notebookName</span>
                                                        </a>
                                                        <span className="count">(notebookCount}</span>
                                                    </li>
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
                                </td>
                                <td className="middle note-list-col">
                                    <NoteList />
                                </td>
                                <td className="edit-note-col">
                                    <EditNote />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default App;
