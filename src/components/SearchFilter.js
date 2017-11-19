import React from 'react';
import PropTypes from 'prop-types';

import Input from './stateless/Input';
import CloseBtn from './stateless/CloseBtn';
import SelectMenu from './stateless/SelectMenu';

const SearchFilter = ({ notes = [], ...props }) => {
    if (!notes.length ) {
        return <div className="empty hidden"></div>;
    }

    return (
        <span className="search-filter">
            <label>Search type:</label>

            <SelectMenu
                name="filterType"
                className="filter-type select-component"
                defaultValue="Title"
                value={props.filterType}
                onChange={(event) => props.onChange({ filterType: event.target.value })}>
                <option>Title</option>
                <option>Description</option>
                <option>Url</option>
            </SelectMenu>

            <Input
                type="text"
                name="search"
                className="search"
                placeholder="Search"
                value={props.searchTerm}
                onChange={(event) => props.onChange((event.target.value.length) ? { searchTerm: event.target.value } : props.clearFilters())} />

            <CloseBtn onClick={() => props.clearFilters()} />
        </span>
    );
};

SearchFilter.propTypes = {
    filterType: PropTypes.string,
    searchTerm: PropTypes.string,
    clearFilters: PropTypes.func,
    onChange: PropTypes.func,
    notes: PropTypes.array
};

export default SearchFilter;
