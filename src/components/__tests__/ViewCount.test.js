import React from 'react';
import { shallow } from 'enzyme';

import ViewCount from '../ViewCount';

describe('ViewCount', () => {
    const notes = [];
    const notebooks = [];

    it('renders without crashing', () => {
        shallow(<ViewCount notes={notes} notebooks={notebooks} />);
    });
});
