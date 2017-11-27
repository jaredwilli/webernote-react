import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../../setupFiles';

import Cover from '../Cover';

describe('Cover component', () => {

    it('renders without crashing', () => {
        shallow(<Cover />);
    });
});
