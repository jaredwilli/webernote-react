import React from 'react';
import { shallow } from 'enzyme';

import SelectMenu from '../SelectMenu';

describe('SelectMenu', () => {
    const props = {
        notebookFilter: '',
        onChange: (e) => e.target.name
    };

    it('renders without crashing', () => {
        shallow(<SelectMenu
            name="filterByNotebook"
            className="filter-by-notebook select-component"
            defaultValue="All Notebooks"
            value={props.notebookFilter}
            onChange={(e) => props.onChange({ notebookFilter: e.target.value })}>
        </SelectMenu>);
    });
});
