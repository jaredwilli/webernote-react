import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCmj24j_yyktraJeSZTwjZuS5VltNxhirY",
    authDomain: "webernote-7f700.firebaseapp.com",
    databaseURL: "https://webernote-7f700.firebaseio.com",
    projectId: "webernote-7f700",
    storageBucket: "",
    messagingSenderId: "1065841426702"
  };
firebase.initializeApp(config);

export const database = firebase.database();

export default firebase;
