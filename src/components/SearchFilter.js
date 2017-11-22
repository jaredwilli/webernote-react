import React from 'react';

import Input from './stateless/Input';
import CloseBtn from './stateless/CloseBtn';
import SelectMenu from './stateless/SelectMenu';
import Option from './stateless/Option'

function SearchFilter(props) {
    // TODO: make the search type a select menu to change the search type
    return (
        <span className="search-filter">
            <label>Search type:</label>

            <SelectMenu
                name="filterType"
                className="filter-type select-component"
                defaultValue="Title"
                value={props.filterType}
                onChange={(e) => props.onChange({ filterType: e.target.value })}>
                <Option text="Title" />
                <Option text="Description" />
                <Option text="Url" />
            </SelectMenu>

            <Input
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
