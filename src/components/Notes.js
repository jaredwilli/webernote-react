import React from 'react';
import { formatDate } from '../common/helpers';
class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        
        this.state = {
            notes: []
        };
    }
    
    handleClick(e) {
        console.log(e.target.id);
        // this.props.onNoteSelected(e.target);
    }

    render() {
        return (
            <div id="notes">
                <ul>
                    {this.state.notes.map((note) => {
                        return (
                            <li className={(note.isEditing) ? 'note selected' : 'note'} key={note.id} id={note.id} onClick={this.handleClick}>
                                <button className="delete">X</button>
                                <h2 className="title">{note.title}</h2>
                                <p>
                                    <span className="date">{formatDate(note.modified_date)}</span>
                                    <span className="tag-item">{note.tags}</span>
                                    <span className="description">{note.description}</span>
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default Notes;
