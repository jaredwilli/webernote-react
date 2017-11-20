import React from 'react';
import { shallow } from 'enzyme';
import LoginModal from '../LoginModal';

function setup() {
    const props = {
        testProp: 'testing',
        login: jest.fn(() => {
            return 'login called!';
        }),
        onClose: jest.fn(() => {
            return 'onClose called!';
        }),
        dialogStyle: {
            backgroundColor: 'red'
        }
    };

    const wrapper = shallow(<LoginModal {...props} />);

    return {
        props,
        wrapper
    }
}

describe('LoginModal', () => {
    it('renders the correct HTML tags', () => {
        const { wrapper } = setup();

        console.log(wrapper.debug());
        // console.log(wrapper.instance().props);

        // expect(wrapper.find('Button').length).toBe(4);

        // expect(wrapper.props().testProp).toBe('testing');
        // expect(wrapper.props().login()).toBe('login called!');
        // expect(wrapper.props().dialogStyle()).toBe({ backgroundColor: 'red' });

    });
});
