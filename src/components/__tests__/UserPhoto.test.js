import React from 'react';
import { shallow } from 'enzyme';

import UserPhoto from '../UserPhoto';

it('renders without crashing', () => {
    shallow(<UserPhoto />);
});
