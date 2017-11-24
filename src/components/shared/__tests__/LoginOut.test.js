import React from 'react';
import { shallow } from 'enzyme';

import LoginOut from '../header/LoginOut';

describe('LoginOut component', () => {
    let props = {};
    props.match = {
        path: '/'
    };

    it('renders without crashing', () => {
        shallow(<LoginOut {...props} />);
    });
});
