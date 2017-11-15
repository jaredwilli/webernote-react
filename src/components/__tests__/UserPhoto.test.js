import React from 'react';
import { shallow } from 'enzyme';

import UserPhoto from '../ui/UserPhoto';

describe('UserPhoto', () => {

    it('renders without crashing', () => {
        shallow(<UserPhoto />);
    });
});
