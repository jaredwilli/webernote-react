import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Toolbar from '../Toolbar';

it('renders without crashing', () => {
    shallow(<Toolbar />);
});
