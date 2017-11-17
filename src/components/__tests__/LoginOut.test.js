import React from 'react';
import { shallow } from 'enzyme';

import LoginOut from '../LoginOut';

describe('LoginOut component', () => {

    it('renders without crashing', () => {
        shallow(<LoginOut />);
    });
});
