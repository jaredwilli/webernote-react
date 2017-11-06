import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Note from '../Note';

it('renders without crashing', () => {
    shallow(<Note />);
});
