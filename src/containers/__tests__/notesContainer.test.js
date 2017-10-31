import React from 'react';
import { shallow, mount, render } from 'enzyme';

import NotesContainer from '../notesContainer';

it('renders without crashing', () => {
    shallow(<NotesContainer />);
});
