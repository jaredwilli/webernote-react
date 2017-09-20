import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Select, { Creatable } from 'react-select';
import 'react-select/dist/react-select.css';

import { guid } from '../common/helpers';
import * as tagActions from '../actions/tagActions';

class TagsContainer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.editTags = this.editTags.bind(this);
	}

	editTags(tags) {
        const propTags = this.props.tags;
        
        if (tags) {
            console.log('if tags');
            // need to add GUID to tags if dont have one

            debugger
            
            let allTags = propTags.concat(tags);
            // Send all Tags including these
            this.props.actions.addTag(allTags);
            
            // Only send these Tags
            this.props.editNoteTags(tags);
        } else {
            console.log('====================================');
            console.log('if !tags');
            console.log('====================================');
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);
