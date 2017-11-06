import React from 'react';
import { shallow, mount, render } from 'enzyme';

import TagsContainer from '../tagsContainer';

it('renders without crashing', () => {
    shallow(<TagsContainer />);
});
