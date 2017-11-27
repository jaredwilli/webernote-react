// import * as setupTests from '../../setupFiles';

import * as types from '../../actions/notebookActions';
// import { refToArray } from '../../common/helpers';

import notebookReducer from '../notebookReducer';

describe('Notebook Reducer', () => {
    it('returns proper initial state', () => {
        expect(notebookReducer(undefined, {})).toEqual({});
    });

});
