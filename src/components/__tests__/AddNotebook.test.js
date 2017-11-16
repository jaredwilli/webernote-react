import React from 'react';
import renderer from 'react-test-renderer';

import AddNotebook from '../AddNotebook';

describe('AddNotebook', () => {
    it('should match the snapshot', () => {
        const notebooks = [];
        const funcs = {
            addNotebook: function() {},
            keyPress: function() {},
            toggleAddState: function() {}
        };

        const component = renderer.create(<AddNotebook
            notebooks={notebooks}
            addNotebook={funcs.addNotebook}
            keyPress={funcs.keyPress}
            toggleAddState={funcs.toggleAddState} />).toJSON();

        expect(component).toMatchSnapshot();
    });
});
