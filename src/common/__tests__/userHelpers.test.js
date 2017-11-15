import React from 'react';
import assert from 'assert';

import { auth } from '../../data/firebase.js';
import { deepMerge } from '../helpers';

import * as usersMock from '../../mocking/users-mock';
import * as utils from '../userHelpers';

describe('User Helper Functions', () => {
    it('creates new user object from new anonUser object', () => {
        let expected = usersMock.userHelpers.anonUserNoData;
        expected.created_date = new Date().getTime();
        expected.last_login = new Date().getTime();

        let result = utils.createUser(usersMock.userHelpers.anonUser);
        expect(expected).toEqual(result);
    });

    it('creates logged in user object from logged in user data', () => {
        let expected = usersMock.userHelpers.loggedInUserNoData;
        expected.created_date = new Date().getTime();
        expected.last_login = new Date().getTime();

        let result = utils.createUser(usersMock.userHelpers.loggedInUser);
        expect(expected).toEqual(result);
    });

    it('merges anonymous user with data to create logged in user with data', () => {
        let expected = usersMock.userHelpers.loggedInUserWithData;
        expected.created_date = new Date().getTime();
        expected.last_login = new Date().getTime();

        let result = utils.createUser(usersMock.userHelpers.loggedInUser, usersMock.userHelpers.anonUserWithData);
        expect(expected).toEqual(result);
    });
});
