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

export default firebase;
