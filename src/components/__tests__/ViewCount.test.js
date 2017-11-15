import React from 'react';
import { shallow } from 'enzyme';

import ViewCount from '../ui/ViewCount';

describe('ViewCount', () => {
    const notes = [];
    const notebooks = [];

    it('renders without crashing', () => {
        shallow(<ViewCount notes={notes} notebooks={notebooks} />);
    });
});
