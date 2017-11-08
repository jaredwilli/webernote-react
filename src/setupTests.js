// setup file
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';

// import firebase, { TEST_URL } from 'firebase';
// import FirebaseServer from 'firebase-server';
// import detect from 'detect-port';
// import * as data from './mocking/webernote-dev-export';

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
global.localStorage = localStorageMock


// ##########################

// Initialize Firebase Server

// ##########################

let sequentialConnectionId = 0;

export function newServerUrl(port = 5000) {
    return 'ws://dummy' + (sequentialConnectionId++) + '.firebaseio.test:' + port;
}
