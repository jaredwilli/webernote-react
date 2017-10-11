// user helper functions

/**
 * createNewUser
 *
 * @param {Object} user
 * @param {Object} anon An anonymous user that is upgrading to oauth user
 */
export function createNewUser(user, anon) {
    return {
        uid: user.uid,
        isAnonymous: user.isAnonymous,
        displayName: (!user.isAnonymous) ? user.displayName : 'guest',
        email: (!user.isAnonymous) ? user.email : '',
        photo: (!user.isAnonymous) ? user.photoURL : '',
        created_date: new Date().getTime(),
        last_login: new Date().getTime(),
        notebooks: (anon && anon.notebooks) ? anon.notebooks : {},
        labels: (anon && anon.labels) ? anon.labels : {},
        notes: (anon && anon.notes) ? anon.notes : {},
        tags: (anon && anon.tags) ? anon.tags : []
    };
}

export function a2z(from = 'a', to = 'z') {
    let a = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return (a.slice(a.indexOf(from), a.indexOf(to) + 1));
}

export function randomVal(arr) {
    if (typeof arr !== 'Array') {
        arr = Object.keys(arr).map((a) => {
            return arr[a];
        });
    }
    return arr[Math.floor(Math.random() * arr.length)];
}

export function randomLetter(from = 'a', to = 'z') {
    return randomVal(a2z(from, to));
}
