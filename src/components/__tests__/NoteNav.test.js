import React from 'react';
import { shallow } from 'enzyme';

import NoteNav from '../NoteNav';

it('renders without crashing', () => {
    shallow(<NoteNav />);
});
