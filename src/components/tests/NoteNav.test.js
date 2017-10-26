import React from 'react';
import { shallow, mount, render } from 'enzyme';

import NoteNav from '../NoteNav';
import '../../styles/note-nav.css';

it('renders without crashing', () => {
    shallow(<NoteNav />);
});
