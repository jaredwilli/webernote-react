import React from 'react';
import { shallow, mount, render } from 'enzyme';

import CloseBtn from '../ui/CloseBtn';

it('renders without crashing', () => {
    shallow(<CloseBtn />);
});
