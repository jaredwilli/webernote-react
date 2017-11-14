import React from 'react';

import SelectMenu from './ui/SelectMenu';
import { getSelectedNotebook } from '../common/noteHelpers'

function FilterByNotebook(props) {
    // Return nothing if no notebooks
    if (!props.notebooks || !props.notebooks.length) {
        return <div className="empty hidden"></div>;
    }

    const getSelectedOption = (e) => ({
        notebookFilter: getSelectedNotebook(e, props.notebooks)
    });

    const defaultValue = 'All Notebooks';
    const defaultOption = <option>{defaultValue}</option>;

    let options = props.notebooks.map((opt) => <option key={opt.id} value={opt.value}>{opt.name}</option>);

    return (
        <SelectMenu
            name="filterByNotebook"
            className="notebook filterByNotebook select-component"
            defaultValue={defaultValue}
            value={props.notebookFilter}
            onChange={(e) => props.onChange(getSelectedOption(e))}>
            {defaultOption}
            {options}
        </SelectMenu>
    );
};

export default FilterByNotebook;
