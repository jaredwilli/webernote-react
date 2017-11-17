import React from 'react';
import { shallow } from 'enzyme';

import LoginButtons from '../LoginButtons';

describe('LoginButtons component', () => {

    it('renders without crashing', () => {
        shallow(<LoginButtons />);
    });
});
