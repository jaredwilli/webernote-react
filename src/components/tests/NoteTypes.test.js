import React from 'react';
import { shallow, mount, render } from 'enzyme';

import NoteTypes from '../NoteTypes';
import '../../styles/note-types.css';

it('renders without crashing', () => {
    shallow(<NoteTypes />);
});
