
import { store } from '../../setupTests';
import { database, auth, PROVIDERS } from '../../data/firebase';

import * as actions from '../userActions';
import userReducer from '../../reducers/userReducer';

describe('User Actions', () => {
    const users = {
        "abc1234": {
            "uid": "abc1234",
            "displayName": null,
            "photoURL": null,
            "email": null,
            "isAnonymous": true
        }
    };

    const user = {
        "uid": "1234",
        "displayName": null,
        "photoURL": null,
        "email": null,
        "isAnonymous": true,
    };


    // NOTE: the async/await here for the signIn promise
    it('dispatches getUsers() action succes', async () => {
        database.ref('users').once = jest.fn(() => {
            return Promise.resolve(users);
        });

        await store.dispatch(actions.getUsers());

        // expect(store.getActions()).toEqual([
        //     { "type": "GET_USERS_REQUESTED", users: users }
        // ]);
    });

    // NOTE: the async/await here for the signIn promise
    it('dispatches loginAnonymously() action succes', async () => {
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
