import * as types from '../constants/actionTypes';
import { refToArray } from '../common/helpers';

export default function userReducer(state = {}, action) {

    switch(action.type) {

        // *** GET USERS
        case types.GetUsersRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.GetUsersRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error in getting users'
            });
        }

        case types.GetUsersFulfilled: {
            const users = action.users;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got users'
            });

            newState.users = refToArray(users);
            return newState;
        }

        // *** GET USER
        case types.GetUserRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.GetUserRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error in getting users'
            });
        }

        case types.GetUserFulfilled: {
            const user = action.user;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Got user'
            });

            user.notes = refToArray(user.notes);
            user.notebooks = refToArray(user.notebooks);
            user.tags = refToArray(user.tags);
            user.labels = refToArray(user.labels);
            newState.user = user;
            return newState;
        }

        // *** ADD USER
        case types.AddUserRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.AddUserRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error adding user'
            });
        }

        case types.AddUserFulfilled: {
            const user = action.user;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Added user'
            });

            newState.users.concat(refToArray(user));
            // TODO: write a selector to get the user from users
            newState.user = user;
            return newState;
        }

        // *** EDIT USER
        case types.EditUserRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.EditUserRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error editing user'
            });
        }

        // TODO: when i actually use this for something create a selector for selectedUser
        case types.EditUserFulfilled: {
            let user = action.user;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'Edited user'
            });

            newState.selectedUser = user;

            if (action.obj.userNotebook) {
                newState.selectedUser.userNotebook = action.obj.userNotebook
            }

            if (action.obj.tags) {
                newState.selectedUser.tags = refToArray(action.obj.tags);
            }

            return newState;
        }

        // *** DELETE USER
        case types.DeleteUserRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.DeleteUserRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error delete user'
            });
        }

        // TODO: update the users state here
        case types.DeleteUserFulfilled: {
            return Object.assign({}, state, {
                inProgress: false,
                success: 'Deleted user'
            });
        }

        // *** SELECT USER
        case types.SelectUserRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.SelectUserRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error selecting user'
            });
        }

        // TODO: create a selector for selectedUser
        case types.SelectUserFulfilled: {
            const user = action.user;

            const newState = Object.assign({}, state, {
                inProgress: false,
                success: 'User selected: ' + user.title
            });

            newState.selectedUser = user;
            return newState;
        }

        // *** LOGIN USER

        // TODO: create other action types for Requested and FulFilled
        case types.LoginUserRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error logging in'
            });
        }

        // *** LOGOUT USER
        case types.LogoutUserRequested: {
            return Object.assign({}, state, {
                inProgress: true,
                error: '',
                success: ''
            });
        }

        case types.LogoutUserRejected: {
            return Object.assign({}, state, {
                inProgress: false,
                error: 'Error logging out'
            });
        }

        // TODO: set the user to offline and time of last login
        case types.LogoutUserFulfilled: {
            return Object.assign({}, state, {
                inProgress: false,
                success: 'User logged out'
            });
        }

        default:
            return state;
    }
}
