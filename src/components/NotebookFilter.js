import React from 'react';
import PropTypes from 'prop-types';
import SelectMenu from './stateless/SelectMenu';
import { getSelectedNotebook } from '../common/noteHelpers';

const NotebookFilter = ({ notebooks = [], notebookFilter = {}, onChange, ...props }) => {
	// Return nothing if no notebooks
	if (!notebooks || !notebooks.length) {
		return <div className="empty hidden" />;
	}

	const getSelectedOption = e => ({
		notebookFilter: getSelectedNotebook(e, notebooks)
	});

	const defaultValue = 'All Notebooks';
	const defaultOption = <option>{defaultValue}</option>;

	const options = notebooks.map(opt => (
		<option key={opt.id} value={opt.value}>
			{opt.name}
		</option>
	));

	return (
		<SelectMenu
			name="filterByNotebook"
			className="notebook filterByNotebook select-component"
			defaultValue={defaultValue}
			value={notebookFilter.id}
			onChange={e => onChange(getSelectedOption(e))}
		>
			{defaultOption}
			{options}
		</SelectMenu>
	);
}

NotebookFilter.propTypes = {
    notebooks: PropTypes.array.isRequired,
    notebookFilter: PropTypes.object,
    onChange: PropTypes.func.isRequired
};

export default NotebookFilter;
