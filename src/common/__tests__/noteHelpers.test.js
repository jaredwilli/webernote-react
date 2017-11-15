import React from 'react';
import { shallow } from 'enzyme';

import * as mocks from '../../mocking/noteHelpers-mock';
import * as funcs from '../noteHelpers';

describe('Note Helper Functions', () => {
    describe('getSelectedNotebook', () => {
        const notebooks = mocks.notebooks;
        const e = mocks.notebookMenuOptions;

        // console.log(funcs.getSelectedNotebook(e, notebooks));
        it('should get the correct notebook from the node list given a target', () => {
            expect(funcs.getSelectedNotebook(e, notebooks)).toEqual({
                id: '-Kyv9QutSpRXVJmvc-c1',
                value: '-Kyv9QutSpRXVJmvc-c1',
                name: 'New notebook'
            });

            // Select a different option should also work
            e.target.value = '_xyz456';

            expect(funcs.getSelectedNotebook(e, notebooks)).toEqual({
                id: '_xyz456',
                value: '_xyz456',
                name: 'Other Notebook'
            });
        });
    });
});
