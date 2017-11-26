import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import NavDrawer from '../ui/NavDrawer';

describe('NavDrawer', () => {

    it('renders without crashing', () => {
        shallow(<NavDrawer />);
    });
});
