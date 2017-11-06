// setup file
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';
// import firebaseMock from 'firebase-mock';

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

// export const mockDatabase = new firebaseMock.MockFirebase();
// export const mockAuth = new firebaseMock.MockFirebase();
// export const mockSdk = new firebaseMock.MockFirebaseSdk(path => {
//     return (path) ? mockDatabase.child(path) : mockDatabase;
// }, () => mockAuth);

// const firebase = mockSdk.initializeApp(); // can take a path arg to database url


// export function renderComponent(ComponentClass, props = {}, state = {}) {
//     const componentInstance =  TestUtils.renderIntoDocument(
//         <Provider store={store}>
//             <ComponentClass {...props} />
//         </Provider>
//     );

//     return $(ReactDOM.findDOMNode(componentInstance));
// }

// export default firebase;
