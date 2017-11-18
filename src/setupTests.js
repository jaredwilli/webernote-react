// setup file
import _ from 'lodash';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-enzyme';

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import jsdom from 'jsdom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

configure({ adapter: new Adapter() });

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


/**
 * React-Router Stub
 *
 * From https://github.com/rackt/react-router/blob/master/docs/guides/testing.md
 *
 *   let stubRouterContext = require('./stubRouterContext');
 *   let IndividualComponent = require('./IndividualComponent');
 *   let Subject = stubRouterContext(IndividualComponent, {someProp: 'foo'});
 *   React.render(<Subject/>, testElement);
 */

export const stubRouterContext = (Component, props, stubs) => {
	return React.createClass({
		childContextTypes: {
			makePath: func,
			makeHref: func,
			transitionTo: func,
			replaceWith: func,
			goBack: func,
			getCurrentPath: func,
			getCurrentRoutes: func,
			getCurrentPathname: func,
			getCurrentParams: func,
			getCurrentQuery: func,
			isActive: func
		},

		getChildContext: () => {
			return _.merge({}, {
                makePath: () => {},
                makeHref: () => {},
                transitionTo: () => {},
                replaceWith: () => {},
                goBack: () => {},
                getCurrentPath: () => {},
                getCurrentRoutes: () => {},
                getCurrentPathname: () => {},
                getCurrentParams: () => {},
                getCurrentQuery: () => {},
                isActive: () => {}
            }, stubs)
        },

		render: () => {
			return <Component {...props} />;
		}
	});
};

