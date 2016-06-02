# Final Project

This full-stack eCommerce app is my final project for the 16 Week Immersive Bootcamp at [DigitalCrafts](http://digitalcrafts.com). The app allows users to submit sample information to a Cooperative Extension service and view (random) test results electronically. It's basically a MEAN stack app, except I used MySQL instead of MongoDB as the database.

## Demo here
* Insert link to portfolio by June 17

## Features
* User can register and log in
* User login status is tracked using ngCookies
* Input fields validated using AngularJS
* Error messages and services forms load in nested views using AngularUI Routing

## Built with...
* Bootstrap 3 (requires jQuery)
* [Compass](http://compass-style.org/)
* [Leaflet.js](http://leafletjs.com/)
* AngularJS v1.5.5
* [AngularUI Router](https://github.com/angular-ui/ui-router)
* [Express](http://expressjs.com/)
* MySQL and Node.js driver for [mysql](https://www.npmjs.com/package/mysql)

### Note:
You will need a public access token from Mapbox for the embedded map to work. Store your access token under assets/js/mapboxApi.js like so:
```javascript
const pubAccessToken = 'myPublicAccessTokenString';
```
When you create a Mapbox account, you will also need to go to the [Mapbox Editor](https://www.mapbox.com/studio/classic/projects/) and create a new project. Store the project ID in assets/js/mapboxApi.js:
```javascript
const projectId = 'myMapboxEditorProjectId';
```