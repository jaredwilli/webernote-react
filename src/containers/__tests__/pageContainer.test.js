import React from 'react';
import { shallow } from 'enzyme';
import * as setupTests from '../../setupFiles';

import PageContainer from '../pageContainer';

function setup() {
    const props = {
        name: 'home'
    };

    const wrapper = shallow(<PageContainer page={props.name} {...props} />);

    return {
        props,
        wrapper
    }
}

describe('PageContainer', () => {
    it('renders without crashing', () => {
        const { wrapper } = setup();

        // console.log(wrapper.debug());
        // console.log(wrapper.instance().props);
    });
});
