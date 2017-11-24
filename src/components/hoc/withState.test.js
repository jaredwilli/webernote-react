import React from 'react';
import { mount } from 'enzyme';

import withState from './withState';

function expectCorrectPropsAdded(wrapper) {
	const props = wrapper.props();
	expect(props.on).toBeDefined();
	expect(props.toggle).toBeDefined();
}

describe('withState', function() {
	it('Check default setup', function() {
		const Dummy = () => <p>dummy</p>;
		const DummyWithState = withState(Dummy);
        const wrapper = mount(<DummyWithState />);

        // expect(wrapper).isOk();
        console.log(wrapper.debug());
		expect(wrapper.props().on).toBeDefined();
		expectCorrectPropsAdded(wrapper.find(Dummy));
	});

	it('On state can be toggled', function() {
		const Dummy = () => <p>dummy</p>;
		const DummyWithState = withState(Dummy);
		const wrapper = mount(<DummyWithState />);
        // expect(wrapper).isOk();

		const instance = wrapper.instance();
		const initialState = wrapper.state('on');
		instance.toggle();
		expect(wrapper.state('on') === !initialState).toBe(true);
	});
});
