import React from 'react';
import { shallow } from 'enzyme';

import NotebooksContainer from '../notebooksContainer';

it('renders without crashing', () => {
    shallow(<NotebooksContainer />);
});
