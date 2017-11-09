import React from 'react';
import { shallow } from 'enzyme';

import AddNote from '../ui/AddNote';

describe('AddNote component', () => {

    it('renders without crashing', () => {
        shallow(<AddNote />);
    });
});
