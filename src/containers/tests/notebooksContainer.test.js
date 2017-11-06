import React from 'react';
import { shallow, mount, render } from 'enzyme';

import NotebooksContainer from '../notebooksContainer';

it('renders without crashing', () => {
    shallow(<NotebooksContainer />);
});
