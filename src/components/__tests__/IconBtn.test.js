import React from 'react';
import { shallow, mount, render } from 'enzyme';

import IconBtn from '../ui/IconBtn';

it('renders without crashing', () => {
    shallow(<IconBtn />);
});
