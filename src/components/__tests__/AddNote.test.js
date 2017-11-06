import React from 'react';
import { shallow } from 'enzyme';

import AddNote from '../AddNote';

it('renders without crashing', () => {
    shallow(<AddNote />);
});
