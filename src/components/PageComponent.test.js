import React from 'react';
import { shallow } from 'enzyme';

import PageComponent from './PageComponent';

describe('PageComponent', () => {
    it('renders without crashing', () => {
        shallow(<PageComponent />);
    });
});
