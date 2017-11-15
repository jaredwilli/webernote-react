import React from 'react';
import { shallow } from 'enzyme';

import ModalContainer from '../modalContainer';

it('renders without crashing', () => {
    shallow(<ModalContainer />);
});
