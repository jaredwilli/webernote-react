import React from 'react';
import assert from 'assert';

import { auth } from '../../data/firebase.js';
import { deepMerge } from '../helpers';

import * as usersMock from '../../mocking/users-mock';
import * as utils from '../userHelpers';

describe('User Helper Functions', () => {
    // Have to mock the date timestamp so it's not always change on me
    const now = 1482363367071;
    Date.now = jest.genMockFunction().mockReturnValue(now);

    it('creates new user object from new anonUser object', () => {
        let expected = usersMock.userHelpers.anonUserNoData;
        let result = utils.createUser(usersMock.userHelpers.anonUser);
        expect(expected).toEqual(result);
    });

    it('creates logged in user object from logged in user data', () => {
        let expected = usersMock.userHelpers.loggedInUserNoData;
        let result = utils.createUser(usersMock.userHelpers.loggedInUser);
        expect(expected).toEqual(result);
    });

    it('merges anonymous user with data to create logged in user with data', () => {
        let expected = usersMock.userHelpers.loggedInUserWithData;
        let result = utils.createUser(usersMock.userHelpers.loggedInUser, usersMock.userHelpers.anonUserWithData);
        expect(expected).toEqual(result);
    });
});
