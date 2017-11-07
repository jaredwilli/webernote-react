/**
 * This config file connects to the default firebase instance for the public demo version
 * of the app that can be used by anyone.
 */
import * as firebase from 'firebase';
import config from './config';
// import mockFirebase from './firebase-mock'

export const ENV = process.env.NODE_ENV;
export const TEST_URL = process.env.MOCK_FIREBASE_DB_URL;

// Initialize firebase with the environment config settings
export const firebaseApp = firebase.initializeApp(
    (ENV === 'production') ? config.firebase_config_prod :
    (ENV === 'development') ? config.firebase_config_dev :
    (ENV === 'test') ? config.firebase_config_test :
        config.firebase_config_auth
);

export const database = firebaseApp.database()
export const auth = firebaseApp.auth();

export const PROVIDERS = {
    fbProvider: new firebaseApp.auth.FacebookAuthProvider(),
    gProvider: new firebaseApp.auth.GoogleAuthProvider(),
    twProvider: new firebaseApp.auth.TwitterAuthProvider(),
    ghProvider: new firebaseApp.auth.GithubAuthProvider()
};

export default firebase;
