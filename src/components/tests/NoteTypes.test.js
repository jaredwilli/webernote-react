import React from 'react';
import { shallow, mount, render } from 'enzyme';

import NoteTypes from '../NoteTypes';

it('renders without crashing', () => {
    shallow(<NoteTypes />);
});
