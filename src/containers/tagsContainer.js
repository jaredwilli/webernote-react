import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tagActions from '../actions/tagActions';

class TagsContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.editTags = this.editTags.bind(this);
    }

    editTags(e) {
        // let tags = this.props.tags;

        // this.setState({
        //     tags: tags
        // });

        // this.props.editTags(tags);
    }

    render() {
        debugger
        if (!this.props.tags) {
            return <div className="loading">Loading...</div>;
        }

        
        // Show add tag input if selected add tag
        // if (this.props.addTag) {
        //     return (
        //         <span>
        //             <button className="cancel-new" onClick={() => this.setState({ addTag: false })}>x</button>
        //             <input type="text" name="tag" className="new-tag" placeholder="Tag name..."
        //                 onBlur={this.addTag} />
        //         </span>
        //     );
        // }

        return (
            // <select name="tag" className="tag" 
            //     value={this.props.tag}
            //     onChange={(e) => this.editTag(e)}>
            //     {tagOptions}
            //     {addNoteBookOption}
            // </select>
            <input type="text" className="tag" name="tags" placeholder="Click to add tag..." 
                value={this.props.selectedNote.tags} 
                onChange={(e) => this.editTags(e)} />
        );
    }
}

function mapStateToProps(state) {
    const newState = {
        notes: state.noteData.notes,
        tags: state.tagData.tags,
        selectedNote: state.noteData.selectedNote
    };
    console.log('STATE: ', state, newState);

    return newState;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(tagActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);
