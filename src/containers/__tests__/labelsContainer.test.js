import React from 'react';
import { shallow } from 'enzyme';

import LabelsContainer from '../labelsContainer';

it('renders without crashing', () => {
    shallow(<LabelsContainer />);
});
