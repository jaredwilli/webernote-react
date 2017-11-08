import React from 'react';
import { shallow } from 'enzyme';

import LoginModal from '../modals/LoginModal';

describe('LoginModal', () => {

    it('renders without crashing', () => {
        shallow(<LoginModal />);
    });
});
