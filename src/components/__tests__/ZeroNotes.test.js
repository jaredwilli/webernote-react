import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import ZeroNotes from '../ZeroNotes';

describe('ZeroNotes', () => {
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
        clearFilters: jest.fn(),
        addNote: jest.fn(),
        showLoginModal: jest.fn()
    };

    it('renders without crashing', () => {
        shallow(<ZeroNotes {...props} />);
    });
});
