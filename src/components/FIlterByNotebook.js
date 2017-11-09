import React from 'react';

import SelectMenu from './ui/SelectMenu';

function FIlterByNotebook(props) {
    // Return nothing if no notebooks
    if (!props.notebooks || !props.notebooks.length) {
        return <div className="empty hidden"></div>;
    }

    const defaultValue = 'All Notebooks';
    const defaultOption = <option>{defaultValue}</option>;

    let options = props.notebooks.map((opt) => <option key={opt.id} value={opt.value}>{opt.name}</option>);

    return (
        <SelectMenu
            name="filterByNotebook"
            className="notebook filterByNotebook select-component"
            defaultValue={defaultValue}
            value={props.notebookFilter}
            onChange={(e) => props.onChange({ notebookFilter: e.target.value })}>
            {defaultOption}
            {options}
        </SelectMenu>
    );
};

export default FIlterByNotebook;
