import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import Modal from '../ui/Modal';

describe('Modal', () => {

    it('renders without crashing', () => {
        shallow(<Modal />);
    });
});
