import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Dropdown from '../ui/Dropdown';

it('renders without crashing', () => {
    shallow(<Dropdown />);
});
