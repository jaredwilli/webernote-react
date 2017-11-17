import React from 'react';
import { shallow } from 'enzyme';

import Dropdown from '../Dropdown';

describe('Dropdown component', () => {

    it('renders without crashing', () => {
        shallow(<Dropdown />);
    });
});
