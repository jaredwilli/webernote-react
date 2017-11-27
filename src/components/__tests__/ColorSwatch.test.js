import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import ColorSwatch from '../ui/ColorSwatch';

describe('ColorSwatch', () => {

    it('renders without crashing', () => {
        shallow(<ColorSwatch />);
    });
});
