import * as types from '../../actions/labelActions';
// import { refToArray } from '../../common/helpers';

import labelReducer from '../labelReducer';

describe('Label Reducer', () => {
    it('returns proper initial state', () => {
        expect(labelReducer(undefined, {})).toEqual({});
    });

});
