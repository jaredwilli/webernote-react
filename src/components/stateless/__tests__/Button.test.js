import React from 'react';
import { shallow } from 'enzyme';

import Button from '../Button';

describe('Button component', () => {

    it('renders without crashing', () => {
        shallow(<Button />);
    });
});
