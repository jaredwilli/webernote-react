import React from 'react';

import { deepMerge } from '../helpers';

import * as mocks from '../../mocking/helpers-mock';
import * as utils from '../helpers';

describe('Helper Functions', () => {
    describe('refToArray', () => {
        it('should handle being passed an empty object without erroring', () => {
            const ref = {};
            const expected = [];
            expect(utils.refToArray(ref)).toEqual(expected);
        });

        it('should handle undefined or null values correctly', () => {
            const ref = null;
            const expected = [];
            expect(utils.refToArray(ref)).toEqual(expected);
        });

        it('should convert an object of objects to array of objects', () => {
            const ref = mocks.tagsRef;
            const expected = mocks.tagsArray;
            expect(utils.refToArray(ref)).toEqual(expected)
        });

    });
});
