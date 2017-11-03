import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

import { getNotes } from '../noteActions.js';

const mockStore = configureMockStore([thunk]);

describe('Note Actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('should have fetchMock', () => {
        expect(fetchMock).toBeDefined();
    });
    // it('handles getNotes success', () => {
    //     const store = mockStore();
    //     console.log(store);
    //     fetchMock.get('../../mocking/webernote-dev-mock.json', {
    //         notes: ['hello world']
    //     });

    //     return store.dispatch(getNotes())
    //         .then(() => {
    //             expect(store.getActions()).toEqual([
    //                 { type: 'GET_NOTES_REQUESTED' },
    //                 { type: 'GET_NOTES_FULFILLED', data: ['hello world'] }
    //             ]);
    //         });
    // });

    // it('handles getNotes failure', () => {
    //     const store = mockStore();
    //     fetchMock.get('../../mocking/webernote-dev-mock.json', {
    //         notes: ['hello world']
    //     });

    //     return store.dispatch(getNotes())
    //         .then(() => {
    //             expect(store.getActions()).toEqual([
    //                 { type: 'GET_NOTES_REQUESTED' },
    //                 { type: 'GET_NOTES_REJECTED' }
    //             ]);
    //         });
    // });
})
