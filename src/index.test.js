import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import configureStore from './store/index';
import WebernoteApp from './index';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
        <Provider store={configureStore}
            ><WebernoteApp />
        </Provider>, div);
});
