import React from 'react';
import { shallow } from 'enzyme';

import WelcomeMsg from '../WelcomeMsg';

describe('WelcomeMsg', () => {

    it('renders without crashing', () => {
        shallow(<WelcomeMsg />);
    });
});
