import React from 'react';
import { shallow } from 'enzyme';

import Note from '../Note';

describe('', () => {
    const notes = [];

    it('renders without crashing', () => {
        shallow(<Note notes={notes} />);
    });
});
