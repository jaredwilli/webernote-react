import React from 'react';
import { shallow } from 'enzyme';

import NavDrawer from '../toolbar/NavDrawer';

describe('NavDrawer', () => {

    it('renders without crashing', () => {
        shallow(<NavDrawer />);
    });
});
