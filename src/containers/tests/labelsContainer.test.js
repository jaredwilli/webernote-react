import React from 'react';
import { shallow, mount, render } from 'enzyme';

import LabelsContainer from '../labelsContainer';

it('renders without crashing', () => {
    shallow(<LabelsContainer />);
});
