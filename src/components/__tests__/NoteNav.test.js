import React from 'react';
import { shallow, mount, render } from 'enzyme';

import NoteNav from '../NoteNav';

it('renders without crashing', () => {
    shallow(<NoteNav />);
});
