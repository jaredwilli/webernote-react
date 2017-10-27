
# Webernote app

[![Build Status](https://travis-ci.org/jaredwilli/webernote-react.svg?branch=master)](https://travis-ci.org/jaredwilli/webernote-react)


#### Overview

This app is a side-project I'm developing using React, Redux, ES6, and Firebase as the data store. I have learned a great deal from building this application, now for the third time. The first time I made it with jQuery, the second time with AngularJS.

It is a great example of what a real-world application might be like, which makes it perfect to build it using different technologies that I want to learn or get better with.



To run this app you simply just clone the repo:

`git clone git@github.com:jaredwilli/webernote-react.git && cd webernote-react`

Then install the dependencies:

`npm install`

Then run the server:

`npm start`

The app will be served on `http://localhost:3000/`.

To build the application for deployment run:

`npm run build`

The app is deployed using Surge, and a command for pushing it to the Surge domain it is on.
Actually, currently it is set up to be built and pushed to the Surge domain when doing `git push ...`.

It's like continuous deployment, cause I can.


*Credits*:
- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
- It uses [Firebase](https://www.firebase.com/) for the data storage.
- [Surge](https://surge.sh/) for serving the app online in a quick, simple and easy to deploy to way.


Copyright 2017-2018 MIT - Jared Williams
