import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as noteActions from '../actions/noteActions';

import NotebooksContainer from '../containers/notebooksContainer';

class EditNote extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selectedNote: (this.props.selectedNote) ? this.props.selectedNote : {}
        };
    }

    handleChange(e) {
        let note = this.props.selectedNote;
        note[e.target.name] = e.target.value;
        note.modified_date = new Date().getTime();

        this.setState({
            selectedNote: note
        });
        this.props.editNote(note);
    }
    
    render() {
        // get the selectedNote from props
        const selectedNote = this.props.selectedNote;

        if (!selectedNote || !selectedNote.id) {
            // this.updateState();

            return (
                <div className="show-note"></div>
            );
        }
        
        return (
            <div id="show-note">
                <form>
                    <div className="top">
                        <input type="text" className="title" name="title" placeholder="Enter title..."  
                            value={selectedNote.title} 
                            onChange={(e) => this.handleChange(e)} />
                        <NotebooksContainer 
                            canAddNotebook={true} 
                            note={selectedNote}
                            notebook={selectedNote.notebook} />
                    </div>
                    <div className="mid">
                        <input type="url" className="url" name="url" placeholder="http://" 
                            value={selectedNote.url} 
                            onChange={(e) => this.handleChange(e)} />
                        <input type="text" className="tag" name="tags" placeholder="Click to add tag..." 
                            value={selectedNote.tags} 
                            onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="bottom">
                        <textarea className="description" name="description" 
                            value={selectedNote.description} 
                            onChange={(e) => this.handleChange(e)}>
                        </textarea>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        selectedNote: state.noteData.selectedNote
    };
    console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(noteActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
