
# Welcome to Webernote!!
---------

[![Build Status](https://travis-ci.org/jaredwilli/webernote-react.svg?branch=build-path)](https://travis-ci.org/jaredwilli/webernote-react)
[![codebeat badge](https://codebeat.co/badges/1396f00a-f7ce-43a0-af73-1bfc2298213c)](https://codebeat.co/projects/github-com-jaredwilli-webernote-react-master)
[![Greenkeeper badge](https://badges.greenkeeper.io/jaredwilli/webernote-react.svg)](https://greenkeeper.io/)
[![dependencies Status](https://david-dm.org/jaredwilli/webernote-react/status.svg)](https://david-dm.org/jaredwilli/webernote-react)

--------

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License:](https://img.shields.io/npm/l/cross-env.svg?style=flat-square)](https://github.com/jaredwilli/webernote-react/blob/master/other/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Roadmap](https://img.shields.io/badge/%F0%9F%93%94-roadmap-CD9523.svg?style=flat-square)](https://github.com/jaredwilli/webernote-react/blob/master/other/ROADMAP.md)


## Overview
-------

This app is a side-project I'm developing using React, Redux, ES6, and Firebase as the data store. I have learned a great deal from building this application, now for the third time. The first time I made it with jQuery, the second time with AngularJS.

It is a great example of what a real-world application might be like, which makes it perfect to build it using different technologies that I want to learn or get better with.

## Demo
-------

![webernote-responsive](https://user-images.githubusercontent.com/218374/33228967-50daa694-d193-11e7-9a34-e15beca4cd39.gif)

You can see that as you change the fields in the edit form, the updates are made everywhere, instantly populating the form rest of the components and filling out the app with some useful UI features and capabilites that you can ultimately operate the application with the more notes you have!

## Responsive Layout
-------

I wanted to be able to take this app and use it anywhere I was right from on my phone. So, I used flexbox to make the rather complex layout of the columns and the edit form rows and filled in remaining spaces which normally would be a problem, it was quite easy with the use of flexbox.

![webernote-desktop](https://user-images.githubusercontent.com/218374/33228962-3a560da0-d193-11e7-8cd3-43fd7134c04a.gif)

It's not 100% perfect yet. But you can use it, it's functional. I did make some improvements that required some more thought around the UX on mobile, but overall it's pretty usable.


## Install
-------

Yarn helps to spead things up a bit, but I use npm as well.

`brew install yarn`

## Clone && cd && yarn
```
git clone git@github.com:jaredwilli/webernote-react.git
cd webernote-react
yarn
```

## Running Server:
-------
`yarn start`

_The app will be served on `(http://localhost:3000/)`.

## Building - Testing - Wathing
-------
This is still a Create React App unejected. (Sounds so weird...)
But there are tons of cool things you can do

### Building
```
yarn build
Yarn build-start
```

### Testing
```
yarn test  [-- --jsdom] [--coverage]
yarn coverage   [--watch]
```

### Sass Watching / Building
```
yarn watch-css
yarn build-css
```

***ORRR..... Read the code :)

### Get a list of the npm scripts you can run.
--------

`yarn run`




## Prettier Configuration

This app uses prettier to auto format the code on pre-commit. It also has a .prettierrc file for setting some defaults. It is recommended that you install Prettier in your code editor of choice and configure your workspace settings for it to be the same as what this project has defined.


## Contributing
-------
Everyone is welcome, we can turn it into a really useful app together!
Of course I am open to anyone looking to contribute. This app is kind of a what I use to build a real-world and production level and quality application using technologies I am not very familiar with so I can pick it up while building a pretty complex single-page-app.

If you are interested in contributing to this project, check out the Issues page and choose from any of the various features, bugs, ideas and other things that you may want to give a shot to add, and open a Pull Request.

## Roadmap
-------

Check out the issues, there's and apply the label Roadmap.


## License
-------

[MIT License](https://opensource.org/licenses/MIT)


