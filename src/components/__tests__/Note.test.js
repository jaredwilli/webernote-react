import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import Note from '../Note';

describe('Notes', () => {
    const notes = [];

    it('renders without crashing', () => {
        shallow(<Note notes={notes} />);
    });
});
