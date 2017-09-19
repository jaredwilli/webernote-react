import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { uniq } from '../common/helpers.js';

import Select, { Creatable } from 'react-select';
import 'react-select/dist/react-select.css';

import * as tagActions from '../actions/tagActions';

class TagsContainer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.editTags = this.editTags.bind(this);
	}

	editTags(tags) {
        const allTags = this.props.tags;
        this.logChange(tags);
        
        if (tags.length) {
            tags.forEach((tag) => {
                if (tag.className) {
                    this.props.actions.addTag(tags, allTags);
                }
            });
        }

        this.props.editTags(tags, allTags);
	}

	logChange(val) {
		console.log('Selected: ' + JSON.stringify(val));
	}

	render() {
        const { selectedNote, tags } = this.props;
        let tagOptions;

        // Make tags uniq
        selectedNote.tags = uniq(selectedNote.tags);
        
		if (!tags) {
            return <div className="loading">Loading...</div>;
		} else {
            let tagOptions = tags;
            tagOptions = uniq(tagOptions);
        }

		return (
			<Creatable
				className="tags"
				name="form-field-name"
				multi
				noResultsText="Click to add tag..."
				value={selectedNote.tags}
				options={tagOptions}
				onChange={e => this.editTags(e)}
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

export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);
