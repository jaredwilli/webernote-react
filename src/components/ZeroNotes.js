import React from 'react';
import PropTypes from 'prop-types';

import WelcomeMsg from './stateless/WelcomeMsg';

const ZeroNotes = ({ ...props }) => {
    const { stateProps } = props;

    if (stateProps.searchTerm.length === '' || stateProps.notebookFilter.id === 'all_notebooks') {
        return (
            <WelcomeMsg
                addNote={props.addNote}
                showLoginModal={props.showLoginModal}
            />
        );
    }

    return (
        <div className="middle list-col note-list">
            <Filters {...props} />

            <div className="empty">Zero notes to show...</div>
        </div>
    );
};

ZeroNotes.propTypes = {
	notes: PropTypes.array,
	notebooks: PropTypes.array,
	stateProps: PropTypes.object,
	filterNotes: PropTypes.func,
	clearFilters: PropTypes.func,
	addNote: PropTypes.func,
	showLoginModal: PropTypes.func
};

export default ZeroNotes;
