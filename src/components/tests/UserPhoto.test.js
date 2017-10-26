import React from 'react';
import { shallow, mount, render } from 'enzyme';

import UserPhoto from '../UserPhoto';

it('renders without crashing', () => {
    shallow(<UserPhoto />);
});
