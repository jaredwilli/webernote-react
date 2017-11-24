import React from 'react';
import { shallow } from 'enzyme';

import Toolbar from '../toolbar/Toolbar';

describe('Toolbar', () => {

    it('renders without crashing', () => {
        shallow(<Toolbar />);
    });
});
