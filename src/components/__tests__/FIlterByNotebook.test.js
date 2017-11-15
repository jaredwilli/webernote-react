import React from 'react';
import { shallow } from 'enzyme';

import FIlterByNotebook from '../FIlterByNotebook';

describe('Notes', () => {
    const notes = [];

    it('renders without crashing', () => {
        shallow(<FIlterByNotebook notes={notes} />);
    });
});
