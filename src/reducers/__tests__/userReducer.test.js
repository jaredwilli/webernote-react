import firebaseMock from 'firebase-mock';

import userReducer from '../userReducer';
import * as actions from '../../actions/userActions';

const mockDatabase = new firebaseMock.MockFirebase();
const mockAuth = new firebaseMock.MockFirebase();
const mockSdk = new firebaseMock.MockFirebaseSdk(path => {
    return (path) ? mockDatabase.child(path) : mockDatabase;
}, () => {
    return mockAuth;
});

const firebase = mockSdk.initializeApp(); // can take a path arg to database url
// optional - expose the mock
global.firebase = firebase;

describe('User Reducer', () => {
    const action = {
        "type": "GET_USER_FULFILLED",
        "user": {
            "created_date": 1509713243577,
            "displayName": "guest",
            "email": "",
            "isAnonymous": true,
            "last_login": 1509713243577,
            "notes": {
                "-Ky0v-9TbPI7fm7KBOpj": {
                    "created_date": 1509713249005,
                    "description": "",
                    "id": "-Ky0v-9TbPI7fm7KBOpj",
                    "isEditing": true,
                    "modified_date": "",
                    "title": "",
                    "url": ""
                }
            },
            "online": true,
            "photo": "",
            "role": "",
            "uid": "jET2M9N9ilYGMpMkiQw6ARqk4Vy1"
        }
    };

    it('returns proper initial state', () => {
        expect(userReducer(undefined, {})).toEqual({});
    });

    it('should get the anonymous user', () => {
        expect(userReducer({}, action)).toEqual({
            "inProgress": false, "success": "Got user",
            user: action.user
        });
    });


});
