import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import EditNote from '../EditNote';

describe('EditNote component', () => {

    it('renders without crashing', () => {
        shallow(<EditNote />);
    });
});

