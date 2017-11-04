import React from 'react';
import { shallow, mount, render } from 'enzyme';

import NoteList from '../NoteList';

it('renders without crashing', () => {
    shallow(<NoteList />);
});
