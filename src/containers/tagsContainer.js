import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { Creatable } from 'react-select';
import 'react-select/dist/react-select.css';

import { compareObjs } from '../common/noteHelpers';
import * as tagActions from '../actions/tagActions';

class TagsContainer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.editTags = this.editTags.bind(this);
	}

    // TODO: add a minimum character limit for new tags
	editTags(inputTags) {
        const selectedNote = this.props.selectedNote;
        let tagCompare = compareObjs(inputTags, selectedNote.tags);

        // Check for new tags to be added
        if (inputTags.length) {
            this.props.actions.editTags({
                type: 'add_tag',
                tags: tagCompare.difference
            }, selectedNote);
        } else {
            this.props.actions.editTags({
                type: 'remove_tag',
                tags: tagCompare.difference
            }, this.props.notes);
        }

        // Edit the notes tags
        this.props.editField(inputTags, selectedNote);
        // Get tags again to update the state
        this.props.actions.getTags();
	}

	render() {
        const { selectedNote, tags } = this.props;

		return (
			<Creatable
				className="tags"
				name="form-field-name"
				multi
				noResultsText="Click to add tag..."
				value={selectedNote.tags}
				options={tags}
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
	console.log('STATE: ', state, newState);

	return newState;
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(tagActions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagsContainer));
