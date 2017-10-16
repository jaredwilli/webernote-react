# Webernote app

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

Finally to deploy it run:

`surge -p /project/path/webernote-react/build -d ≤SOME_DOMAIN_NAME>.surge.sh`

Surge will awesomely deploy the built application code to the domain specified and you will be able to see it at the url http://SOME_DOMAIN_NAME.surge.sh/.



*Credits*:
- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
- It uses [Firebase](https://www.firebase.com/) for the data storage.
- [Surge](https://surge.sh/) for serving the app online in a quick, simple and easy to deploy to way.


Copyright 2017-2018 MIT - Jared Williams
