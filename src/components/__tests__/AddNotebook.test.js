import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import AddNotebook from '../AddNotebook';

describe('AddNotebook component', () => {

    it('renders without crashing', () => {
        shallow(<AddNotebook />);
    });
});
