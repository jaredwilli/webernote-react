import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import NoteList from '../components/NoteList';
import EditNote from '../components/EditNote';

import * as noteActions from '../actions/noteActions';

class FlexVerticalGrid extends React.PureComponent {
	constructor(props) {
		super(props);
    }

	render() {
        const {
            leftCol = LeftColumn,
            leftColProps = {},
            middleCol = MiddleColumn,
            middleColProps = {},
            rightCol = RightColumn,
            rightColProps = {}
        } = this.props;


        return (
            <GridVerticalLayout
                leftCol={ leftColProps && <LeftColumn { ...leftColProps } /> }
                middleCol={ middleColProps && <MiddleColumn { ...middleColProps } /> }
                rightCol={ rightColProps && <RightColumn { ...rightColProps } /> }
            />
		);
	}
}

function mapStateToProps(state) {
	const newState = {
        notes: state.noteData.notes,
		selectedNote: state.noteData.selectedNote
	};
	// console.log('STATE: ', state, newState);

	return newState;
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(noteActions, dispatch)
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FlexVerticalGrid));
