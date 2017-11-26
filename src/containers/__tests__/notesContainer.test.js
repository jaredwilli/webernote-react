import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import NotesContainer from '../notesContainer';

it('renders without crashing', () => {
    shallow(<NotesContainer />);
});
