import React from 'react';
import { shallow, mount, render } from 'enzyme';

import AppContainer from '../appContainer';

it('renders without crashing', () => {
    shallow(<AppContainer />);
});
