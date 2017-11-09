import React from 'react';
import { shallow } from 'enzyme';

import CloseBtn from '../ui/CloseBtn';

describe('CloseBtn component', () => {

    it('renders without crashing', () => {
        shallow(<CloseBtn />);
    });
});
