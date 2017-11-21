import React from 'react';
import PropTypes from 'prop-types';

import SearchFilter from '../SearchFilter';
import ViewCount from '../ViewCount';

const Filters = ({ notes = [], notebooks = [], ...props }) => {
    const { filterType, searchTerm, notebookFilter } = props.stateProps;

	return (
		<div className="filters">
			<div className="filter">
				<SearchFilter
					notes={notes}
					filterType={filterType}
					searchTerm={searchTerm}
					onChange={props.filterNotes}
					clearFilters={props.clearFilters}
				/>
			</div>

			{(notebooks.length > 0) && (
				<div className="viewing">
					<ViewCount
						notes={notes}
						notebooks={notebooks}
						notebookFilter={notebookFilter}
						onChange={props.filterNotes}
					/>
				</div>
			)}
		</div>
	);
};

Filters.propTypes = {
    notes: PropTypes.array,
    notebooks: PropTypes.array,
    stateProps: PropTypes.object,
    filterNotes: PropTypes.func,
    clearFilters: PropTypes.func
};

export default Filters;
