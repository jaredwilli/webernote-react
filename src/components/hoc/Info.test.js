import React from 'react';
import { shallow } from 'enzyme';
import Sinon from 'sinon';

import { Info } from './info';

const infoMessage = 'Something important here';

describe('Info pure', () => {
	it('Renders "show info" and calls toggle on click', () => {
		const spy = Sinon.spy();
		const wrapper = shallow(
			<Info on={false} toggle={spy}>
				{infoMessage}
			</Info>
		);
		// expect.isOk(wrapper);
		expect.notInclude(wrapper.html(), infoMessage);
		wrapper.find('#toggleInfo').simulate('click');
		expect.isTrue(spy.called);
	});

	it('Renders info and "Hide info" button and calls toggle on click', () => {
		const spy = Sinon.spy();
		const wrapper = shallow(
			<Info on={true} toggle={spy}>
				{infoMessage}
			</Info>
		);
		// expect.isOk(wrapper);
		expect.include(wrapper.html(), infoMessage);
		wrapper.find('#toggleInfo').simulate('click');
		expect.isTrue(spy.called);
	});
});
