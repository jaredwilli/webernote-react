import React from 'react';
import { shallow } from 'enzyme';

import DevTools from '../DevTools';

describe('DevTools component', () => {

    it('renders without crashing', () => {
        shallow(<DevTools />);
    });
});
