import React from 'react';
import { shallow } from 'enzyme';

import LoginModal from '../modals/LoginModal';

it('renders without crashing', () => {
    shallow(<LoginModal />);
});
