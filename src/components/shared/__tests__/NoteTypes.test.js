import React from 'react';
import { shallow } from 'enzyme';

import NoteTypes from '../toolbar/NoteTypes';

describe('NoteTypes', () => {

    it('renders without crashing', () => {
        shallow(<NoteTypes />);
    });
});
