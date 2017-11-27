import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../../setupFiles';

import Textarea from '../Textarea';

describe('Textarea component', () => {
    const props = {};

    it('renders without crashing', () => {
        shallow(<Textarea {...props} />);
    });
});
