import React from 'react';

import { deepMerge } from '../helpers';

import * as mocks from '../../mocking/noteHelpers-mock';
import * as funcs from '../highOrderFuncs';

describe('Higher Order Functions', () => {
    describe('notesWithType - notebooks, tags, labels', () => {
        it('return an empty array if no notes with type', () => {
            const emptyNotes = mocks.notesEmptyNote;

            expect(funcs.notesWithType(emptyNotes, 'notebook').length).toEqual(0);
            expect(funcs.notesWithType(emptyNotes, 'tags').length).toEqual(0);
            expect(funcs.notesWithType(emptyNotes, 'label').length).toEqual(0);
        });

        it('return one note that has the type', () => {
            const oneNotes = mocks.notesFullNote;

            expect(funcs.notesWithType(oneNotes, 'notebook').length).toEqual(1);
            expect(funcs.notesWithType(oneNotes, 'tags').length).toEqual(1);
            expect(funcs.notesWithType(oneNotes, 'label').length).toEqual(1);
        });
    });

    describe('typesWithCount - notebooks, tags, labels', () => {
        it('return an empty array if no notes with type', () => {
            const emptyNotes = mocks.notesEmptyNote;

            expect(funcs.notesWithType(emptyNotes, 'notebook').length).toEqual(0);
            expect(funcs.notesWithType(emptyNotes, 'tags').length).toEqual(0);
            expect(funcs.notesWithType(emptyNotes, 'label').length).toEqual(0);
        });

        it('return one note that has the type', () => {
            const oneNotes = mocks.notesFullNote;

            expect(funcs.notesWithType(oneNotes, 'notebook').length).toEqual(1);
            expect(funcs.notesWithType(oneNotes, 'tags').length).toEqual(1);
            expect(funcs.notesWithType(oneNotes, 'label').length).toEqual(1);
        });
    });
});
