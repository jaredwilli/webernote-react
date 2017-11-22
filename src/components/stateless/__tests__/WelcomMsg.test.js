import React from 'react';
import { mount } from 'enzyme';
import WelcomeMsg from '../WelcomeMsg';

function setup() {
    const props = {
        testProp: 'testing',
        addNote: jest.fn(() => {
            return 'addNote called!';
        }),
        showLoginModal: jest.fn(() => {
            return 'showLoginModal called!';
        }),
    };

    const wrapper = mount(<WelcomeMsg {...props} />);

    return {
        props,
        wrapper
    }
}

describe('WelcomeMsg', () => {
    it('renders the correct HTML tags', () => {
        const { wrapper } = setup();

        // console.log(wrapper.debug());
        // console.log(wrapper.instance().props);

        expect(wrapper.find('div').first()).toHaveClassName('zero-notes');
        expect(wrapper.find('div').length).toBe(3);

        expect(wrapper.find('h2').text()).toBe('Welcome to Webernote!');

        expect(wrapper.find('p').length).toBe(2);

        expect(wrapper.find('ul').length).toBe(1);
        expect(wrapper.find('li').length).toBe(5);

        expect(wrapper.find('Button').length).toBe(2);

        expect(wrapper.props().testProp).toBe('testing');
        expect(wrapper.props().addNote()).toBe('addNote called!');
        expect(wrapper.props().showLoginModal()).toBe('showLoginModal called!');

    });
});
