import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import NoteTypes from '../NoteTypes';

describe('NoteTypes', () => {

    it('renders without crashing', () => {
        shallow(<NoteTypes />);
    });
});
