import React from 'react';
import { shallow, mount, render } from 'enzyme';

import IconBtn from '../IconBtn';

it('renders without crashing', () => {
    shallow(<IconBtn />);
});
