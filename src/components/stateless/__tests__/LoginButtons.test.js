import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../../setupFiles';

import LoginButtons from '../LoginButtons';

describe('LoginButtons component', () => {

    it('renders without crashing', () => {
        shallow(<LoginButtons />);
    });
});
