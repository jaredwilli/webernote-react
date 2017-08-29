import React from 'react';
import NotebookContainer from '../containers/notebooks.js';

class EditNote extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            note: this.props.selectedNote
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            note: nextProps.selectedNote
        });
    }

    handleChange(e) {
        let note = this.state.note;
        note[e.target.name] = e.target.value;
        
        this.setState({
            note: note
        });

        this.props.onEditNote(this.state.note);
    }
    
    render() {
        if (!this.state.note.id) {
            return (
                <div className="show-note"></div>
            );
        }

        return (
            <div id="show-note">
                <form>
                    <div className="top">
                        <input type="text" className="title" name="title" placeholder="Enter title..."  
                            value={this.state.note.title} 
                            onChange={this.handleChange} />
                        
                        <NotebookContainer 
                            canAddNotebook={true} 
                            note={this.state.note}
                            notebook={this.state.note.notebook} />
                    </div>
                    <div className="mid">
                        <input type="url" className="url" name="url" placeholder="http://" 
                            value={this.state.note.url} 
                            onChange={this.handleChange} />
                        <input type="text" className="tag" name="tags" placeholder="Click to add tag..." 
                            value={this.state.note.tags} 
                            onChange={this.handleChange} />
                    </div>
                    <div className="bottom">
                        <textarea className="description" name="description" 
                            value={this.state.note.description} 
                            onChange={this.handleChange}>
                        </textarea>
                    </div>
                </form>
            </div>
        );
    }
}

export default EditNote;
