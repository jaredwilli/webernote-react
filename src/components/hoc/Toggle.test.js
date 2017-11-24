import React from 'react';
import { Toggle } from './toggle';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Sinon from 'sinon';

describe('Toggle pure', () => {
	it('Renders Off OK and calls toggle on click', () => {
		const spy = Sinon.spy();
		const wrapper = shallow(<Toggle on={false} toggle={spy} />);

        // expect.isOk(wrapper);
		expect(wrapper.html()).to.include('Off');
		wrapper.find('span').simulate('click');
		expect(spy.called).toBe(true);
	});

	it('Renders On OK and calls toggle on click', () => {
		const spy = Sinon.spy();
		const wrapper = shallow(<Toggle on={true} toggle={spy} />);

        // expect.isOk(wrapper);
		expect(wrapper.html()).to.include('On');
		wrapper.find('span').simulate('click');
		expect(spy.called).toBe(true);
	});
});
