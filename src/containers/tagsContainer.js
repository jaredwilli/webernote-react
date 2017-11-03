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
	editTags(tags) {
        const selectedNote = this.props.selectedNote;

        // Check for new tags to be added
        if (tags.length) {
            let newTag = tags.filter((tag) => {
                return tag.hasOwnProperty('className');
            });

            if (newTag.length) {
                // ADD: new tag
                this.props.actions.addTag(newTag, selectedNote);
                this.props.editField({ type: 'add', tags });
            }
            else if (selectedNote.tags && selectedNote.tags.length < tags.length) {
                // ADD: Add existing tag
                // tags = compareObjs(tags, selectedNote.tags);
                this.props.editField({ type: 'add', tags });
            }
            else if (selectedNote.tags && selectedNote.tags.length > tags.length) {
                // DELETE: remove tag
                // tags = compareObjs(tags, selectedNote.tags);
                this.props.editField({ type: 'delete', tags });
            }
            else {
                console.log('Whats this?');
                debugger;
            }
        }
        else {
            // DELETE: All tags on selectedNote
            tags = compareObjs(tags, selectedNote.tags);
            this.props.editField({ type: 'delete', tags });
        }
	}

	render() {
        const { selectedNote, tags } = this.props;
        let tagOptions;

        if (tags) {
            tagOptions = tags;
        }
debugger;
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
	// console.log('STATE: ', state, newState);

	return newState;
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(tagActions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagsContainer));
