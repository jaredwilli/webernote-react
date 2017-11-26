import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import NotebookFilter from '../NotebookFilter';
import * as mocks from '../../mocking/noteHelpers-mock';

describe('NotebookFilter', () => {
    const notebooks = mocks.notebooks;
    const notes = mocks.notes;
    const notebookFilter = mocks.notebookFilter;

    it('renders without crashing', () => {
        shallow(<NotebookFilter
            notes={notes}
            notebookFilter={notebookFilter}
            notebooks={notebooks} />);
    });

    // it('it has 2 options as children the menu', () => {
    //     const wrapper = shallow(<NotebookFilter
    //         notes={notes}
    //         notebookFilter={notebookFilter}
    //         notebooks={notebooks} />);
    //     // console.log(wrapper);
    // });
});
