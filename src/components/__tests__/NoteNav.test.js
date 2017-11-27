import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import NoteNav from '../NoteNav';

describe('NoteNav', () => {

    it('renders without crashing', () => {
        shallow(<NoteNav />);
    });
});
