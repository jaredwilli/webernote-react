import React from 'react';
import { shallow } from 'enzyme';

import NoteList from '../NoteList';

it('renders without crashing', () => {
    shallow(<NoteList />);
});
