import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../../setupFiles';


import FontAwesome from '../FontAwesome';

describe('FontAwesome component', () => {

    it('renders without crashing', () => {
        shallow(<FontAwesome />);
    });
});
