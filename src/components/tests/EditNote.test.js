import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Editnote from '../Editnote';

it('renders without crashing', () => {
    shallow(<Editnote />);
});
