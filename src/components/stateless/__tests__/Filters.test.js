import React from 'react';
import { shallow } from 'enzyme';

import Filters from '../Filters';

describe('Filters component', () => {
    const props = {
        notes: [],
        notebooks: [],
        stateProps: {
            filterType: 'Title',
            searchTerm: '',
            notebookFilter: {
				name: 'All notebooks',
				id: 'all_notebooks'
            }
        },
        filterNotes: jest.fn(),
        clearFilters: jest.fn()
    };
    it('renders without crashing', () => {
        shallow(<Filters {...props} />);
    });
});
