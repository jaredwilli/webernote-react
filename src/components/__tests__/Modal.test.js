import React from 'react';
import { shallow } from 'enzyme';

import Modal from '../ui/Modal';

describe('Modal', () => {

    it('renders without crashing', () => {
        shallow(<Modal />);
    });
});
