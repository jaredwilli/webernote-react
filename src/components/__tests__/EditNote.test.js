import React from 'react';
import { shallow, mount, render } from 'enzyme';

import EditNote from '../EditNote';

it('renders without crashing', () => {
    shallow(<EditNote />);
});
