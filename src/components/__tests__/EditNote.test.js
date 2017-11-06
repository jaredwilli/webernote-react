import React from 'react';
import { shallow } from 'enzyme';

import EditNote from '../EditNote';

it('renders without crashing', () => {
    shallow(<EditNote />);
});
