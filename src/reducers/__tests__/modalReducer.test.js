// import * as setupTests from '../../setupFiles';

import * as types from '../../actions/modalActions';
// import { refToArray } from '../../common/helpers';

import modalReducer from '../modalReducer';

describe('Modal Reducer', () => {
    it('returns proper initial state', () => {
        expect(modalReducer(undefined, {})).toEqual({
            props: {},
            type: null
        });
    });

});
