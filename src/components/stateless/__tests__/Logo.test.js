import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../Logo';

describe('Logo', () => {
    it('renders the correct HTML tags for the logo', () => {
        const wrapper = shallow(<Logo />);

        // console.log(wrapper.debug());
        // console.log(wrapper.instance().props);

        expect(wrapper.find('div').first()).toHaveClassName('logo');
        expect(wrapper.find('.tagline').text()).toBe('Real-time note taking. Increase your productivity!');
        expect(wrapper.find('Link').props().to).toBe('/');
        expect(wrapper.find('Link').props().replace).toBe(false);
    });
});
