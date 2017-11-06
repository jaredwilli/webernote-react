import React from 'react';
import { shallow } from 'enzyme';

import WelcomeMsg from '../WelcomeMsg';

it('renders without crashing', () => {
    shallow(<WelcomeMsg />);
});
