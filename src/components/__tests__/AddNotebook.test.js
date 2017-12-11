import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import AddNotebook from '../AddNotebook';

describe('AddNotebook component', () => {
    const props = {
        addNotebook: jest.fn(() => 'Notebook Added')
    };

    it('renders without crashing', () => {
        shallow(<AddNotebook { ...props } />);
    });
});
