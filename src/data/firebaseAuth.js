/**
 * This config file connects to a different firebase instance that is used for 
 * authenticating users and storing users data.
 */

import * as firebaseAuth from 'firebase';

// Initialize Firebase
const authConfig = {
    apiKey: "AIzaSyDWX6KwRN0tmGLi6-4CFgZYfVzWIZtiyYs",
    authDomain: "webernote-auth.firebaseapp.com",
    databaseURL: "https://webernote-auth.firebaseio.com",
    projectId: "webernote-auth",
    storageBucket: "webernote-auth.appspot.com",
    messagingSenderId: "567445181045"
};

// export const gProvider = new firebase.auth.GoogleAuthProvider();
export const fbProvider = new firebaseAuth.auth.FacebookAuthProvider();
export const auth = firebaseAuth.auth();

firebaseAuth.initializeApp(authConfig, 'secondary');

export const authDatabase = firebaseAuth.database();

export default firebaseAuth;
