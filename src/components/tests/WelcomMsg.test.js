import React from 'react';
import { shallow, mount, render } from 'enzyme';

import WelcomeMsg from '../WelcomeMsg';

it('renders without crashing', () => {
    shallow(<WelcomeMsg />);
});
