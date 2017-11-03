/**
 * This config file connects to the default firebase instance for the public demo version
 * of the app that can be used by anyone.
 */
import * as firebase from 'firebase';

export const env = process.env.NODE_ENV;

// Production config
const prodConfig = {
    apiKey: 'AIzaSyCmj24j_yyktraJeSZTwjZuS5VltNxhirY',
	authDomain: 'webernote-7f700.firebaseapp.com',
	databaseURL: 'https://webernote-7f700.firebaseio.com',
	projectId: 'webernote-7f700',
	storageBucket: '',
	messagingSenderId: '1065841426702'
};

// Development config
const devConfig = {
    apiKey: "AIzaSyD1y7RymxIkyR4ol0bOh9_m9kemsmh_Eq4",
    authDomain: "webernote-dev.firebaseapp.com",
    databaseURL: "https://webernote-dev.firebaseio.com",
    projectId: "webernote-dev",
    storageBucket: "webernote-dev.appspot.com",
    messagingSenderId: "383968252512"
};

// Authorization config (not used?)
const authConfig = {
    apiKey: "AIzaSyDWX6KwRN0tmGLi6-4CFgZYfVzWIZtiyYs",
    authDomain: "webernote-auth.firebaseapp.com",
    databaseURL: "https://webernote-auth.firebaseio.com",
    projectId: "webernote-auth",
    storageBucket: "webernote-auth.appspot.com",
    messagingSenderId: "567445181045"
};

let config, providers = {};

// Initialize the app based on the environment to use the associated config settings
if (env === 'development') {
    config = authConfig;
    firebase.initializeApp(config);
    providers.fbProvider = new firebase.auth.FacebookAuthProvider();
}
else if (env === 'production') {
    config = prodConfig;
    firebase.initializeApp(config);

    providers.fbProvider = new firebase.auth.FacebookAuthProvider();
    providers.gProvider = new firebase.auth.GoogleAuthProvider();
    providers.twProvider = new firebase.auth.TwitterAuthProvider();
    providers.ghProvider = new firebase.auth.GithubAuthProvider();
}
else if (env === 'test') {
    // TODO: Test environment is just pointing to the devConfig
    config = authConfig;
    firebase.initializeApp(config);
    providers.fbProvider = new firebase.auth.FacebookAuthProvider();
}

const initFirebase = firebase.initializeApp(config, 'AUTH');

export const database = initFirebase.database();
export const auth = firebase.auth();
export const PROVIDERS = providers;

export default firebase;
