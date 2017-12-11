import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import NotebookFilter from '../NotebookFilter';
import * as mocks from '../../mocking/noteHelpers-mock';

describe('NotebookFilter', () => {
    const props = {
        notebooks: mocks.notebooks,
        notes: mocks.notes,
        notebookFilter: mocks.notebookFilter,
        onChange: jest.fn(() => {
            return 'onChange called!';
        })
    };

    it('renders without crashing', () => {
        shallow(<NotebookFilter
            notes={props.notes}
            notebookFilter={props.snotebookFilter}
            notebooks={props.notebooks}
            onChange={() => props.onChange()} />);
    });

    // it('it has 2 options as children the menu', () => {
    //     const wrapper = shallow(<NotebookFilter
    //         notes={notes}
    //         notebookFilter={notebookFilter}
    //         notebooks={notebooks} />);
    //     // console.log(wrapper);
    // });
});
