/**
 * Configuration settings for each Firebase environment
 */
const config = {
    // Production config
    firebase_config_prod: {
        apiKey: 'AIzaSyCmj24j_yyktraJeSZTwjZuS5VltNxhirY',
        authDomain: 'webernote-7f700.firebaseapp.com',
        databaseURL: 'https://webernote-7f700.firebaseio.com',
        projectId: 'webernote-7f700',
        storageBucket: '',
        messagingSenderId: '1065841426702'
    },
    // Development config
    firebase_config_dev: {
        apiKey: "AIzaSyD1y7RymxIkyR4ol0bOh9_m9kemsmh_Eq4",
        authDomain: "webernote-dev.firebaseapp.com",
        databaseURL: "https://webernote-dev.firebaseio.com",
        projectId: "webernote-dev",
        storageBucket: "webernote-dev.appspot.com",
        messagingSenderId: "383968252512"
    },
    // Authorization config (not used?)
    firebase_config_auth: {
        apiKey: "AIzaSyDWX6KwRN0tmGLi6-4CFgZYfVzWIZtiyYs",
        authDomain: "webernote-auth.firebaseapp.com",
        databaseURL: "https://webernote-auth.firebaseio.com",
        projectId: "webernote-auth",
        storageBucket: "webernote-auth.appspot.com",
        messagingSenderId: "567445181045"
    },
    // Testing config
    firebase_config_test: {
        apiKey: 'fake-api-key-for-testing-purposes-only',
        databaseURL: 'localhost.firebaseio.test:5000'
    },
    firebase_providers: [
        'facebook.com',
        'twitter.com',
        'google.com',
        'github.com',
        'password',
        'phone'
    ],
    initial_state: {
        theme: 'dark',
        locale: 'en'
    },
    drawer_width: 200
};

export default config;
