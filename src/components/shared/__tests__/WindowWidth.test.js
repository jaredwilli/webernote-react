import React from 'react';
import { shallow } from 'enzyme';

import WindowWidth from '../WindowWidth';

describe('WindowWidth component', () => {

    it('renders without crashing', () => {
        shallow(<WindowWidth />);
    });
});
