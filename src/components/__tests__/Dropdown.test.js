import React from 'react';
import { shallow } from 'enzyme';

import Dropdown from '../ui/Dropdown';

it('renders without crashing', () => {
    shallow(<Dropdown />);
});
