// import * as setupTests from '../../setupFiles';

import userReducer from '../userReducer';
import * as actions from '../../actions/userActions';;

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
            "role": ""
        }
    };

    it('returns proper initial state', () => {
        expect(userReducer(undefined, {})).toEqual({});
    });

    it('should get the anonymous user', () => {
        expect(userReducer({}, action)).toEqual({
            "inProgress": false,
            "success": "Got user",
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
                "role": ""
            }
        });
    });
});
