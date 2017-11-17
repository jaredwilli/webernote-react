import React from 'react';
import { shallow } from 'enzyme';

import IconBtn from '../stateless/IconBtn';

describe('IconBtn', () => {

    it('renders without crashing', () => {
        shallow(<IconBtn />);
    });
});
