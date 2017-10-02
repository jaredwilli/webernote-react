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
		// this.removeEmptyTags = this.removeEmptyTags.bind(this);
	}

    // TODO: add a minimum character limit for new tags
	editTags(tags) {
        const selectedNote = this.props.selectedNote;

        // Check for new tags to be added
        if (tags.length) {
            tags.forEach((tag) => {
                if (tag.className) {
                    this.props.actions.addTag(tags, selectedNote);
                }
            });
        }
        
        // Check for tags to be removed
        if (tags.length < selectedNote.tags.length) {
            this.props.actions.removeTags(this.props.notes);
        }

        // Edit the notes tags
        this.props.editTags(tags, selectedNote);
        // Get tags again to update the state
        this.props.actions.getTags();
	}

	render() {
        const { user, selectedNote, tags } = this.props;
        let tagOptions;

        if (!tags) {
            return <div className="loading">Loading...</div>;
		} else {
            tagOptions = tags;
            
            // Filter notebooks for the logged in user
            if (user) {
                tagOptions = tagOptions.filter((tag) => {
                    return tag.uid === user.uid;
                });
            } else {
                tagOptions = tagOptions.filter((tag) => {
                    return tag.uid === undefined;
                });
            }
        }

		return (
			<Creatable
				className="tags"
				name="form-field-name"
				multi
				noResultsText="Click to add tag..."
				value={selectedNote.tags}
				options={tagOptions}
				onChange={(e) => this.editTags(e)}
			/>
		);
	}
}

function mapStateToProps(state) {
	const newState = {
        user: state.userData.user,
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
