import React from 'react';
import { shallow } from 'enzyme';

import AppContainer from '../appContainer';

it('renders without crashing', () => {
    shallow(<AppContainer />);
});
