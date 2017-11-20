import React from 'react';
import { shallow } from 'enzyme';

import Option from '../Option';

describe('Option component', () => {
    const propsWithOutProps = {};

    const propsWithOutValue = {
        text: 'Test Value'
    };

    const propsWithValue = {
        value: 'test-value',
        text: 'Test Value'
    };

    it('renders without crashing', () => {
        let wrapper = shallow(<Option {...propsWithOutValue} />);

        console.log(wrapper.debug());

    });


});
