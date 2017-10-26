import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Modal from '../Modal';

it('renders without crashing', () => {
    shallow(<Modal />);
});
