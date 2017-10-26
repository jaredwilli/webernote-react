import React from 'react';
import { shallow, mount, render } from 'enzyme';

import AddNote from '../AddNote';

it('renders without crashing', () => {
    shallow(<AddNote />);
});
