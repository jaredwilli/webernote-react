import React from 'react';
import { shallow } from 'enzyme';

import SearchFilter from '../ui/SearchFilter';

describe('SearchFilter', () => {
    const notes = [];
    const notebooks = [];

    it('renders without crashing', () => {
        shallow(<SearchFilter notes={notes} notebooks={notebooks} />);
    });
});
