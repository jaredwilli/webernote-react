import React from 'react';
import { shallow } from 'enzyme';

import Option from '../Option';

let props = {};

describe('Option component', () => {
    afterEach(() => {
        props = {};
    });

    it('should render component with no props', () => {
        const wrapper = shallow(<Option />);
        expect(wrapper.text()).toBe('Select an option...');
        expect(wrapper.props().value).toBeUndefined();
    });

    it('should render props with only text prop', () => {
        props = {
            text: 'Select Notebook'
        };
        const wrapper = shallow(<Option text={props.text} />);
        expect(wrapper.text()).toBe('Select Notebook');
        expect(wrapper.props().value).toBeUndefined();
    });

    it('should render component with props value and text', () => {
        props = {
            value: 'my-test',
            text: 'My Test'
        };
        const wrapper = shallow(<Option value={props.value} text={props.text} />);
        expect(wrapper.text()).toBe('My Test');
        expect(wrapper.props().value).toBe('my-test');
    });
});
