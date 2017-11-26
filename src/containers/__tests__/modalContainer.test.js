import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';


import ModalContainer from '../modalContainer';

it('renders without crashing', () => {
    shallow(<ModalContainer />);
});
