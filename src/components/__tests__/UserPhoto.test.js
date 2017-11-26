import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import UserPhoto from '../UserPhoto';

describe('UserPhoto', () => {

    it('renders without crashing', () => {
        shallow(<UserPhoto />);
    });
});
