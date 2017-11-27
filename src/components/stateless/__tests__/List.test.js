import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../../setupFiles';

import List from '../List';

describe('List component', () => {

    it('renders without crashing', () => {
        shallow(<List />);
    });
});
