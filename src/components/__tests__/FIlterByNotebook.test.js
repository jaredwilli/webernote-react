import React from 'react';
import { shallow } from 'enzyme';

import FilterByNotebook from '../FilterByNotebook';
import * as mocks from '../../mocking/noteHelpers-mock';

describe('FilterByNotebook', () => {
    const notebooks = mocks.notebooks;
    const notes = mocks.notes;
    const notebookFilter = mocks.notebookFilter;

    it('renders without crashing', () => {
        shallow(<FilterByNotebook
            notes={notes}
            notebookFilter={notebookFilter}
            notebooks={notebooks} />);
    });

    it('it has 2 options as children the menu', () => {
        const wrapper = shallow(<FilterByNotebook
            notes={notes}
            notebookFilter={notebookFilter}
            notebooks={notebooks} />);
        console.log(wrapper);
    });
});
