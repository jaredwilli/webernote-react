import React from 'react';
import { shallow, mount, render } from 'enzyme';

import ModalContainer from '../modalContainer';

it('renders without crashing', () => {
    shallow(<ModalContainer />);
});
