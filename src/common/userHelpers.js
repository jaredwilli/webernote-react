// user helper functions

// import _ from 'lodash';
//import React from 'react';

/**
 * createNewUser
 * 
 * @param {String} refId 
 * @param {Object} user
 */
export function createNewUser(user) {
    const newUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photo: user.photoURL,
        notebooks: {},
        notes: {},
        tags: []
    };
    return newUser;
}
