import React from 'react';
import { shallow, mount, render } from 'enzyme';

import ModalContainer from '../modalContainer';
import '../../styles/modal.css';

it('renders without crashing', () => {
    shallow(<ModalContainer />);
});
