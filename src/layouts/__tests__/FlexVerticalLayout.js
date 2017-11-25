import React from 'react';
import { shallow } from 'enzyme';

import FlexVerticalLayout from '../FlexVerticalLayout';

it('renders without crashing', () => {
    shallow(<FlexVerticalLayout />);
});
