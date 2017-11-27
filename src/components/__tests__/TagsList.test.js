import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import TagsList from '../TagsList';

describe('TagsList', () => {

    it('renders without crashing', () => {
        shallow(<TagsList />);
    });
});
