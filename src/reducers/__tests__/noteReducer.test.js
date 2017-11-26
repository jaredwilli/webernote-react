// import * as setupTests from '../../setupFiles';

import * as types from '../../actions/noteActions';
// import { refToArray } from '../../common/helpers';

import noteReducer from '../noteReducer';

describe('Note Reducer', () => {
    it('returns proper initial state', () => {
        expect(noteReducer(undefined, {})).toEqual({});
    });

});
