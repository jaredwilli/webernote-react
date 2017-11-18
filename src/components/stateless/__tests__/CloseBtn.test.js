import React from 'react';
import { shallow } from 'enzyme';

import CloseBtn from '../CloseBtn';

describe('CloseBtn component', () => {

    it('renders without crashing', () => {
        shallow(<CloseBtn />);
    });
});
