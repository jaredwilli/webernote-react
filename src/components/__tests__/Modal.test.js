import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Modal from '../ui/Modal';

it('renders without crashing', () => {
    shallow(<Modal />);
});
