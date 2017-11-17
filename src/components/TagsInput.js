import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { Creatable } from 'react-select';
import 'react-select/dist/react-select.css';

import { compareObjs } from '../common/noteHelpers';
import * as tagActions from '../actions/tagActions';

class TagsContainer extends React.Component {
	constructor(props) {
		super(props);

		this.editTags = this.editTags.bind(this);
	}

    // TODO: add a minimum character limit for new tags
	editTags(tags) {
        const { notes, selectedNote } = this.props;

        // Check for new tags to be added
        if (tags.length) {
            tags.map(tag => (tag.className) ? this.props.actions.addTag(tags, selectedNote) : tag);
        }

        // Check for tags to be removed
        if (tags.length < selectedNote.tags.length) {
            this.props.actions.removeTags(notes, compareObjs(tags, selectedNote.tags));
        }

        // Edit the notes tags
        this.props.editField(tags, selectedNote);
        // Get tags again to update the state
        this.props.actions.getTags();
    }

	render() {
        const { selectedNote, tags = [] } = this.props;

		return (
			<Creatable
				multi
				className="tags"
				name="form-field-name"
				noResultsText="Click to add tag..."
				options={tags}
				value={selectedNote.tags}
				onChange={(e) => this.editTags(e)}
			/>
		);
	}
}

function mapStateToProps(state) {
	const newState = {
		notes: state.noteData.notes,
		tags: state.tagData.tags,
		selectedNote: state.noteData.selectedNote
	};
	// console.log('STATE: ', state, newState);

	return newState;
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(tagActions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagsContainer));
