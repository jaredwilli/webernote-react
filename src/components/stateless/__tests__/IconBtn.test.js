import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../../setupFiles';


import IconBtn from '../IconBtn';

describe('IconBtn', () => {

    it('renders without crashing', () => {
        shallow(<IconBtn />);
    });
});
