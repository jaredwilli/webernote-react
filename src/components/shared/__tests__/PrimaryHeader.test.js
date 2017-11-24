import React from 'react';
import { shallow } from 'enzyme';

import PrimaryHeader from '../header/PrimaryHeader';

describe('PrimaryHeader', () => {

    it('renders without crashing', () => {
        shallow(<PrimaryHeader />);
    });
});
