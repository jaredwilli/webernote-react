import React from 'react';
import { shallow } from 'enzyme';

import NotesContainer from '../notesContainer';

it('renders without crashing', () => {
    shallow(<NotesContainer />);
});
