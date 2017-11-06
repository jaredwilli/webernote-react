import React from 'react';
import { shallow } from 'enzyme';

import TagsContainer from '../tagsContainer';

it('renders without crashing', () => {
    shallow(<TagsContainer />);
});
