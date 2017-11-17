import React from 'react';
import { shallow } from 'enzyme';

import Expandable from '../Expandable';

describe('Expandable component', () => {

    it('renders without crashing', () => {
        shallow(<Expandable />);
    });
});
