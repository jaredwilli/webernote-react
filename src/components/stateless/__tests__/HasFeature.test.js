import React from 'react';
import { shallow } from 'enzyme';

import HasFeature from '../HasFeature';

describe('HasFeature component', () => {

    it('renders without crashing', () => {
        shallow(<HasFeature />);
    });
});
