import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import AddNote from '../AddNote';

describe('AddNote component', () => {

    it('renders without crashing', () => {
        shallow(<AddNote />);
    });
});
