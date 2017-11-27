import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../../setupFiles';

import CloseBtn from '../CloseBtn';

describe('CloseBtn component', () => {

    it('renders without crashing', () => {
        shallow(<CloseBtn />);
    });
});
