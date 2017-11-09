import React from 'react';
import { shallow } from 'enzyme';

import ColorPicker from '../ui/ColorPicker';

describe('ColorPicker', () => {

    it('renders without crashing', () => {
        shallow(<ColorPicker />);
    });
});
