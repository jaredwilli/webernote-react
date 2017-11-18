import React from 'react';
import { shallow } from 'enzyme';

import AppContainer from '../appContainer';

describe('AppContainer', () => {
    it('renders without crashing', () => {
        shallow(<AppContainer />);
    });


});
