import React from 'react';
import { shallow, mount, render } from 'enzyme';

import LoginModal from '../modals/LoginModal';

it('renders without crashing', () => {
    shallow(<LoginModal />);
});
