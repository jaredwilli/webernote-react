import React from 'react';

import * as usersMock from '../../mocking/users-mock';
import * as utils from '../userHelpers';

describe('User Helper Functions', () => {
    it('creates new user object from new anonUser object', () => {
        const expected = usersMock.userHelpers.anonUserNoData;
        const result = utils.createUser(usersMock.userHelpers.anonUser);
        expect(expected).toEqual(result);
    });

    it('creates logged in user object from logged in user data', () => {
        const expected = usersMock.userHelpers.loggedInUserNoData;
        const result = utils.createUser(usersMock.userHelpers.loggedInUser);
        expect(expected).toEqual(result);
    });

    it('merges anonymous user with data to create logged in user with data', () => {
        const expected = usersMock.userHelpers.loggedInUserWithData;
        const result = utils.createUser(usersMock.userHelpers.loggedInUser, usersMock.userHelpers.anonUserWithData);
        expect(expected).toEqual(result);
    });
});
