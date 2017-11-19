import React from 'react';

import SelectMenu from './stateless/SelectMenu';
import { getSelectedNotebook } from '../common/noteHelpers'

const FilterByNotebook = ({ notebooks = [], notebookFilter, ...props }) => {
    // Return nothing if no notebooks
    if (!notebooks.length) {
        return <div className="empty hidden"></div>;
    }

    const getSelectedOption = (e) => ({
        notebookFilter: getSelectedNotebook(e, notebooks)
    });

    const defaultValue = 'All Notebooks';
    const defaultOption = <option>{defaultValue}</option>;

    const options = notebooks.map((opt) => <option key={opt.id} value={opt.value}>{opt.name}</option>);

    return (
        <SelectMenu
            name="filterByNotebook"
            className="notebook filterByNotebook select-component"
            defaultValue={defaultValue}
            value={notebookFilter.id}
            onChange={(e) => props.onChange(getSelectedOption(e))}>
            {defaultOption}
            {options}
        </SelectMenu>
    );
};

export default FilterByNotebook;
