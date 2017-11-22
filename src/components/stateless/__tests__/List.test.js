import React from 'react';
import { shallow } from 'enzyme';

import List from '../List';

describe('List component', () => {

    it('renders without crashing', () => {
        shallow(<List />);
    });
});
