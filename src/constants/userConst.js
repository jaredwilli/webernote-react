/* Default Tag and Notebook which cannot be removed */

export const AUTH = {
    ANONYMOUS: 'anonymous',
    LOGGEDIN: 'loggedin'
};

export const ROLES = {
    SUPERADMIN: 'superadmin',
    ADMINISTRATOR: 'administrator',
    CONTRIBUTOR: 'contributor',
    TESTER: 'tester',
    USER: 'user',
    GUEST: 'guest'
};

export const PERMISSIONS = {
    BASIC_APP: 'basic_app',
    ADD_USER: 'add_user',
    DELETE_USER: 'delete_user',
    DELETE_USER_NOTES: 'delete_user_notes',
    EDIT_USER: 'edit_user',
    VIEW_USERS_LIST: 'view_users_list',
    VIEW_USERS_NOTES: 'view_users_notes',
    EDIT_PROFILE: 'edit_profile',
    DELETE_PROFILE: 'delete_profile',
    MANAGE_ROLES: 'manage_roles',
    MANAGE_PERMISSIONS: 'manage_permissions',
    OMEGA: 'omega'
};
