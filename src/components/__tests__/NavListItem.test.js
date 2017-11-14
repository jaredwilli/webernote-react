import React from 'react';
import renderer from 'react-test-renderer';
import TestUtils from 'react-dom/test-utils'; // ES6


import NavListItem from '../ui/NavListItem.js';

describe('<NavListItem />', () => {
    const type = 'notebooks';
    const items = [];
    const notes = [];

    it('should match the snapshot', () => {
        const component = renderer.create(
            <NavListItem type={type} items={items} notes={notes} />
        ).toJSON();

        expect(component).toMatchSnapshot();


    });
});
