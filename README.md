# Webernote app

Webernote is a web app I built based on the Evernote desktop app. It is written with React, Redux, and ES6, and can be viewed here: http://webernote.surge.sh/.

This is the third time building Webernote, the first 2 times were a few years ago.  The first version I made with jQuery back in the good 'ol days when things were simple and everyone was a jQuery expert. 

I never finished it though because I decided to rebuild it using AngularJS v1.2, I think. Angular was just beginning to gain popularity at that time, and what better way to learn it than rebuild an app I already had a solid vision of how the should data flow and be presented.

Although I never completed that version either, it did take less time to get more of it completed than with jQuery, and didn't have all the performance problems from callback hell.

Unfortunately the Angular one was left in a broken state, in a branch of the repo I made the original app in, and never put it online. I should try to do that though for comparing all 3 versions.

## About this version

This version of Webernote is built with React, Redux, and Firebase for storing the data. It's written with es6, transpiled via Babel, and built/served with Webpack. I am also using VSCode as my editor to develop and write the code. 

It took me about 3 days to get the core functionality working, get/edit/add/delete notes and notebooks. 

All of these things, are completely new technologies to me in that I have never used them before to build an actual app. VSCode has great support for all these and many more things, so I had to make the switch from Sublime Text 2. 

As for React, I am willing to accept that it is taking over the web. Angular 2+ has a strong community, but React is taking the lead. The fundamentals and core concepts it is built on make it pretty compelling and who am I to argue with change. 

The code for this app is probably shit. I struggled a lot to understand redux and the many different ways everyone everywhere write components and redux stores.
I always avoided React, but I was wrong to. I may be late to the game, but I'm totally ready and here to play!! 

## What's left to do?

The previous incarnations of Webernote included authentication to use it, using Twitter Oauth. 

I chose to not do that initially when starting this version because I remember how much time I spent on that back then, and it was way to long, with little reward. Visitors to the app were required to register to try it out. I didn't want that for this version, due to the likely fact I'll never actually complete it hahaha!!

I mean, come on. It's pretty complex. All the navigation links in side and top would have to be dynamic and real-time updating, and all kinds of things, drag n drop, tagging inputs, and more.


*Credits*:
- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
- It uses [Firebase](https://www.firebase.com/) for the data storage.
- [Surge](https://surge.sh/) for serving the app online in a quick, simple and easy to deploy to way.


Copyright 2017-2018 MIT - Jared Williams
