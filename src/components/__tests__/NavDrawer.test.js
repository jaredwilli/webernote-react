import React from 'react';
import { shallow } from 'enzyme';

import NavDrawer from '../NavDrawer';

it('renders without crashing', () => {
    shallow(<NavDrawer />);
});
