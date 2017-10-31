import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import AppContainer from '../appContainer';

it('renders without crashing', () => {
    shallow(<AppContainer />);
});

it('capturing Snapshot of AppContainer', () => {
    const renderedValue =  renderer.create(<AppContainer />).toJSON()
    expect(renderedValue).toMatchSnapshot();
});

describe('AppContainer should load user and user props correctly', () => {
    test('container component has user props', () => {
        const container = renderer.create(
            <AppContainer />
        );

        console.log('container');


    });
});
