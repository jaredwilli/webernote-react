import React from 'react';
import { shallow } from 'enzyme';

import EditNote from '../EditNote';

describe('EditNote component', () => {

    it('renders without crashing', () => {
        shallow(<EditNote />);
    });
});

