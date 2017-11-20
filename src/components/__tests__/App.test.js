import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('App', () => {
    const store = {
        subscribe: jest.fn(),
        dispatch: jest.fn(),
        getState: jest.fn()
        // subscribe: jest.fn()
    };

    it('renders without crashing', () => {
        shallow(<App store={store} />);
    });
});
