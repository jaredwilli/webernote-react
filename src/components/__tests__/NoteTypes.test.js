import React from 'react';
import { shallow } from 'enzyme';

import NoteTypes from '../NoteTypes';

it('renders without crashing', () => {
    shallow(<NoteTypes />);
});
