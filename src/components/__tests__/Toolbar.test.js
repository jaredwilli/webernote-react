import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import Toolbar from '../Toolbar';

describe('Toolbar', () => {

    it('renders without crashing', () => {
        shallow(<Toolbar />);
    });
});
