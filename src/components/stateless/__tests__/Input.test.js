import React from 'react';
import { shallow } from 'enzyme';

import Input from '../Input';

describe('Input component', () => {

    it('renders without crashing', () => {
        shallow(<Input />);
    });
});
