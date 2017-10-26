import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Modal from '../Modal';
import '../../styles/modal.css';

it('renders without crashing', () => {
    shallow(<Modal />);
});
