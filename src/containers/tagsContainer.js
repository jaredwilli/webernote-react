import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Select, { Creatable } from 'react-select';
import 'react-select/dist/react-select.css';

import * as tagActions from '../actions/tagActions';

class TagsContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.editTags = this.editTags.bind(this);
        this.logChange = this.logChange.bind(this);
    }

    editTags(tag) {
        let tags = this.props.tags;

        if (tag && tag[0].className === 'Select-create-option-placeholder') {
            this.props.actions.addTag(tag);
            this.props.actions.getTags();
        } else if (tag && !tag[0].className) {
            this.props.editTags(tag, tags);
        } else {
            // this.props.deleteTag(tag);
        }
    }


    logChange(val) {
        console.log("Selected: " + JSON.stringify(val));
    }

    render() {
        const { selectedNote, tags } = this.props;

        if (!tags) {
            return <div className="loading">Loading...</div>;
        }
        
        console.log(selectedNote.tags);
        
        return (
            <Creatable
                className="tags"
                name="form-field-name"
                multi
                noResultsText="Click to add tag..."
                value={selectedNote.tags}
                options={tags}
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
