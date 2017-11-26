import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import ColorPicker from '../ui/ColorPicker';

describe('ColorPicker', () => {

    it('renders without crashing', () => {
        shallow(<ColorPicker />);
    });
});
