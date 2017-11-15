import React from 'react';
import { shallow } from 'enzyme';

import ViewCount from '../ui/ViewCount';
import * as mocks from '../../mocking/noteHelpers-mock';

describe('ViewCount', () => {
    const notebooks = mocks.notebooks;
    const notes = mocks.notes;
    const notebookFilter = mocks.notebookFilter;

    it('renders without crashing', () => {
        const wrapper = shallow(<ViewCount
            notes={notes}
            notebooks={notebooks}
            notebookFilter={notebookFilter} />);

        // expect(wrapper.context

    });

});
