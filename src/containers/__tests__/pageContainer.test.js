import React from 'react';
import { mount } from 'enzyme';

import PageContainer from '../pageContainer';

function setup() {
    const props = {
        name: 'home'
    };

    const wrapper = mount(<PageContainer {...props} />);

    return {
        props,
        wrapper
    }
}

describe('PageContainer', () => {
    it('renders without crashing', () => {
        const { wrapper } = setup();

        console.log(wrapper.debug());
        // console.log(wrapper.instance().props);
    });
});
