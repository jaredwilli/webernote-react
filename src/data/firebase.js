/**
 * This config file connects to the default firebase instance for the public demo version
 * of the app that can be used by anyone.
 */

import * as firebase from 'firebase';

// Initialize Firebase
const publicConfig = {
    apiKey: 'AIzaSyCmj24j_yyktraJeSZTwjZuS5VltNxhirY',
	authDomain: 'webernote-7f700.firebaseapp.com',
	databaseURL: 'https://webernote-7f700.firebaseio.com',
	projectId: 'webernote-7f700',
	storageBucket: '',
	messagingSenderId: '1065841426702'
};

firebase.initializeApp(publicConfig);

export const database = firebase.database();

// Initialize FirebaseAuth
const authConfig = {
    apiKey: "AIzaSyDWX6KwRN0tmGLi6-4CFgZYfVzWIZtiyYs",
    authDomain: "webernote-auth.firebaseapp.com",
    databaseURL: "https://webernote-auth.firebaseio.com",
    projectId: "webernote-auth",
    storageBucket: "webernote-auth.appspot.com",
    messagingSenderId: "567445181045"
};

export const gProvider = new firebase.auth.GoogleAuthProvider();
export const fbProvider = new firebase.auth.FacebookAuthProvider();
export const twProvider = new firebase.auth.TwitterAuthProvider();

export const auth = firebase.auth();

let userDatabase = firebase.initializeApp(authConfig, 'AUTH');
export const authDatabase = userDatabase.database();

export default firebase;


/*
import 'firebase';
import * as admin from 'firebase-admin';
import firstServiceAccount from 'path/to/service-account-1';
import secondServiceAccount from 'path/to/service-account-2';

var _first = admin.initializeApp(
  {
    credential: admin.credential.cert(firstServiceAccount),
    databaseURL: 'https://<1st-db-name>.firebaseio.com'
  },
  'first' // this name will be used to retrieve firebase instance. E.g. first.database();
);

var _second = admin.initializeApp(
  {
    credential: admin.credential.cert(secondServiceAccount),
    databaseURL: 'https://<2nd-db-name>.firebaseio.com'
  },
  'second' // this name will be used to retrieve firebase instance. E.g. second.database();
);

export const first = _first;
export const second = _second;


@usage
import { first, second } from '../path/to/the/file/above'

first.database();
second.database();
*/
