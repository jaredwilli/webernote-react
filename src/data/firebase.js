/**
 * This config file connects to the default firebase instance for the public demo version
 * of the app that can be used by anyone.
 */
import * as firebase from 'firebase';
import config from './config';
// import mockFirebase from './firebase-mock'

// Set the ENV variable for dev site to use the dev config if NODE_ENV is production but the url has dev in it, otherwise just use whatever the NODE_ENV is as usual.
export const ENV = (process.env.NODE_ENV === 'production' && window.location.hostname.indexOf('dev') > 0) ? 'development' : process.env.NODE_ENV;
export const TEST_URL = process.env.MOCK_FIREBASE_DB_URL;

// Initialize firebase with the environment config settings
export const firebaseApp = firebase.initializeApp(
    (ENV === 'production') ? config.firebase_config_prod : config.firebase_config_dev
);
export const firebaseTest = firebase.initializeApp(
    (ENV === 'test') ? config.firebase_config_test : config.firebase_config_auth,
    'TEST'
);

// TODO: Need to figure out how to work out test and auth configs in this
// export const firebaseApp = firebase.initializeApp(
//     (ENV === 'production') ? config.firebase_config_prod :
//     (ENV === 'development') ? config.firebase_config_dev :
//     (ENV === 'test') ? config.firebase_config_test :
//         config.firebase_config_auth
// );

export const database = firebaseApp.database()
export const auth = firebaseApp.auth();

export const databaseTest = firebaseTest.database()
export const authTest = firebaseTest.auth();

export const PROVIDERS = {
    fbProvider: new firebase.auth.FacebookAuthProvider(),
    gProvider: new firebase.auth.GoogleAuthProvider(),
    twProvider: new firebase.auth.TwitterAuthProvider(),
    ghProvider: new firebase.auth.GithubAuthProvider()
};

export default firebase;
