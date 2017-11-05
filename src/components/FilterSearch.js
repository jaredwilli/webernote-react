import React from 'react';
import PropTypes from 'prop-types';

import CloseBtn from './ui/CloseBtn';

FilterSearch.propTypes = {
    filterType: PropTypes.string,
    searchTerm: PropTypes.string,
    filterNotes: PropTypes.func,
    clearFilters: PropTypes.func
};

function FilterSearch({ filterType, searchTerm, filterNotes, clearFilters }) {

    return (
        <div className="filters">
            <div className="filter">
                <label>Search type:</label>
                <select name="filterType" className="filter-type"
                    value={filterType}
                    onChange={(e) => filterNotes({ filterType: e.target.value })}>
                    <option>Title</option>
                    <option>Description</option>
                    <option>Url</option>
                </select>

                <input type="text" name="search" placeholder="Search" className="search"
                    value={searchTerm}
                    onChange={(e) => filterNotes((e.target.value.length) ? { searchTerm: e.target.value } : undefined)} />

                <CloseBtn onClick={clearFilters} />
            </div>
        </div>
    );
};

export default FilterSearch;
