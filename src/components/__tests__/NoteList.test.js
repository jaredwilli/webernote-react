import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import NoteList from '../NoteList';

describe('NoteList', () => {

    it('renders without crashing', () => {
        shallow(<NoteList />);
    });
});
