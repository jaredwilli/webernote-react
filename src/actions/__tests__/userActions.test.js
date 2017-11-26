import firebase from 'firebase';
import FirebaseServer from 'firebase-server';

import { firebaseTest, databaseTest, auth } from '../../data/firebase';
import * as setupTests from '../../setupFiles';

import * as usersMock from '../../mocking/users-mock';
import * as actions from '../userActions';
import userReducer from '../../reducers/userReducer';

describe('User Actions', () => {
    let server;

    afterEach(function() {
		if (server) {
			server.close();
			server = null;
		}
	});

    const users = {
        "abc1234": {
            "uid": "abc1234",
            "displayName": 'guest',
            "photoURL": null,
            "email": null,
            "isAnonymous": true
        }
    };

    const anonUser = {
        "uid": "1234",
        "displayName": 'guest',
        "photoURL": null,
        "email": null,
        "isAnonymous": true,
    };

    const usersRef = databaseTest.ref('users');

    // NOTE: the async/await here for the signIn promise
    it('should dispatch GET USERS() action success', async () => {
        firebaseTest.once = jest.fn(() => {
            return Promise.resolve(usersMock.userHelpers.anonUser);
        });

        await setupTests.store.dispatch(actions.getUsers());

        expect(setupTests.store.getActions()).toEqual([
            { type: 'GET_USERS_REQUESTED' }
        ]);

        databaseTest.ref('users').once('value', (snap) => {
            expect(snap.val()).toEqual(null);
        });
    });

    it('should dispatch GET USER() action success', async () => {
        const userRef = databaseTest.ref('users/' + usersMock.userHelpers.anonUser.uid);

        firebaseTest.once = jest.fn(() => {
            return Promise.resolve(usersMock.userHelpers.anonUser);
        });

        await setupTests.store.dispatch(actions.getUser(usersMock.userHelpers.anonUser, userRef));

        expect(setupTests.store.getActions()).toEqual([{"type": "GET_USERS_REQUESTED"}, {"type": "GET_USER_REQUESTED"}]);

        databaseTest.ref('users').once('value', (snap) => {
            expect(snap.val()).toEqual(null);
        });
    });

    // NOTE: the async/await here for the signIn promise
    it('dispatches loginAnonymously() to login user to dispatch getUser() action', async () => {
        // Mock the firebase signIn method as a jest mock
        auth.signInAnonymously = jest.fn(() => {
            return Promise.resolve(usersMock.userHelpers.anonUser);
        });

        await setupTests.store.dispatch(actions.loginAnonymously());

        expect(setupTests.store.getActions()).toEqual([{"type": "GET_USERS_REQUESTED"}, {"type": "GET_USER_REQUESTED"}, {"type": "LOGIN_ANONYMOUS_REQUESTED"}]);
    });

});
