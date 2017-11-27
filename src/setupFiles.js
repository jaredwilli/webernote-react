// setup file
import _ from 'lodash';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactTestRenderer from 'react-test-renderer';

import TestUtils from 'react-dom/test-utils';
import jsdom from 'jsdom';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;


export const mockStore = configureMockStore([thunk]);
export const store = mockStore();

const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	clear: jest.fn()
};

global.localStorage = localStorageMock;

// Initialize Firebase Server
let sequentialConnectionId = 0;

export function newServerUrl(port = 5000) {
	return 'ws://dummy' + sequentialConnectionId++ + '.firebaseio.test:' + port;
}
