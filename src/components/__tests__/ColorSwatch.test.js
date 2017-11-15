import React from 'react';
import { shallow } from 'enzyme';

import ColorSwatch from '../ui/ColorSwatch';

describe('ColorSwatch', () => {

    it('renders without crashing', () => {
        shallow(<ColorSwatch />);
    });
});
