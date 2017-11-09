import React from 'react';
import CloseBtn from './ui/CloseBtn';
import SelectMenu from './ui/SelectMenu';

function SearchFilter(props) {
    if (!props.notes || !props.notes.length ) {
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
                onChange={(e) => props.onChange({ filterType: e.target.value })}>
                <option>Title</option>
                <option>Description</option>
                <option>Url</option>
            </SelectMenu>

            <input
                type="text"
                name="search"
                className="search"
                placeholder="Search"
                value={props.searchTerm}
                onChange={(e) => props.onChange((e.target.value.length) ? { searchTerm: e.target.value } : props.clearFilters())} />

            <CloseBtn onClick={() => props.clearFilters()} />
        </span>
    );
};

export default SearchFilter;
