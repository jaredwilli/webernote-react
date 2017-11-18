import React from 'react';
import { shallow } from 'enzyme';

import Note from '../Note';

describe('Notes', () => {
    const notes = [];

    it('renders without crashing', () => {
        shallow(<Note notes={notes} />);
    });
});
