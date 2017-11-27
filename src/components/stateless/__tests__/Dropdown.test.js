import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../../setupFiles';

import Dropdown from '../Dropdown';

describe('Dropdown component', () => {

    it('renders without crashing', () => {
        shallow(<Dropdown />);
    });
});
