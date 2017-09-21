import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creatable } from 'react-select';
import 'react-select/dist/react-select.css';

import * as tagActions from '../actions/tagActions';

class TagsContainer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.editTags = this.editTags.bind(this);
	}

	editTags(tags) {
        const selectedNote = this.props.selectedNote;
        
        // Send tags and note to add tags and edit tags
        this.props.actions.editTags(tags, selectedNote);
        this.props.editNoteTags(tags)
	}

	render() {
        const { selectedNote, tags } = this.props;
        
		if (!tags) {
            return <div className="loading">Loading...</div>;
        }

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
		tags: state.tagData.tags,
		notes: state.noteData.notes,
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


export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);
