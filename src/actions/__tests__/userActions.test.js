
import { store } from '../../setupTests';
import { database, auth } from '../../data/firebase';

import * as actions from '../userActions';
import userReducer from '../../reducers/userReducer';


describe('User Actions', () => {
    it('dispatches loginAnonymously() action succes', async () => {
        const user = {
            "uid": "MMxDb57A8lQ9qb7MySuqoE2vciI2",
            "displayName": null,
            "photoURL": null,
            "email": null,
            "isAnonymous": true,
        };

        // Mock the firebase signIn method as a jest mock
        auth.signInAnonymously = jest.fn(() => {
            return Promise.resolve(user);
        });

        await store.dispatch(actions.loginAnonymously());

        expect(store.getActions()).toEqual([
            { "type": "LOGIN_ANONYMOUS_REQUESTED" }
        ]);
    });

});
