import React from 'react';
import { shallow, mount, render } from 'enzyme';

import WelcomeMsg from '../WelcomeMsg';
import '../../styles/welcome-msg.css';

it('renders without crashing', () => {
    shallow(<WelcomeMsg />);
});
