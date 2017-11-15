import * as types from '../../actions/tagActions';
// import { refToArray } from '../../common/helpers';

import tagReducer from '../tagReducer';

describe('Tag Reducer', () => {
    it('returns proper initial state', () => {
        expect(tagReducer(undefined, {})).toEqual({});
    });

});
