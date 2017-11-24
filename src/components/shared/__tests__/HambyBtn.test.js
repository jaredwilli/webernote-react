import React from 'react';
import { shallow } from 'enzyme';

import HambyBtn from '../toolbar/HambyBtn';

describe('HambyBtn component', () => {

    it('renders without crashing', () => {
        shallow(<HambyBtn />);
    });
});
