import React from 'react';
import { shallow, mount, render } from 'enzyme';

import NavDrawer from '../NavDrawer';

it('renders without crashing', () => {
    shallow(<NavDrawer />);
});
