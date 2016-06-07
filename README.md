# Final Project

This full-stack eCommerce app is my final project for the 16 Week Immersive Bootcamp at [DigitalCrafts](http://digitalcrafts.com). The app allows users to submit sample information to a Cooperative Extension service and view (random) test results electronically. It's basically a MEAN stack app, except I used MySQL instead of MongoDB as the database. Why MySQL? Well, because I like the query syntax better.

## Demo here
* Insert link to portfolio by June 17

## Features
* User can register and log in
* User login status is tracked using ngCookies
* Input fields validated using AngularJS
* Error messages and services-forms load in nested views using AngularUI Routing
	- Do we need to load them in nested views? Of course not; it's just a demonstration of AngularUI Routing. Otherwise we could just use ng-show, jQuery, or even vanilla JavaScript.
* Sample submission forms are submitted to the backend using a custom http abstraction service.
* Nodemailer sends user a confirmation email when order is complete and paid for.

## Built with...
* Bootstrap 3 (requires jQuery)
* [Compass](http://compass-style.org/)
* [Leaflet.js](http://leafletjs.com/) - this will display sample locations using geocoding
* AngularJS v1.5.5
* [AngularUI Router](https://github.com/angular-ui/ui-router)
* [Express](http://expressjs.com/)
* Node.js [driver](https://www.npmjs.com/package/mysql) for MySQL
* Node.js [module](https://stripe.com/docs/libraries) for Stripe
* Nodemailer

### Custom AngularJS Services
* UserAuthService - provides a function to check the token stored in $cookies against the token stored in the MySQL database by making an $http POST request to the backend
* HttpAbstractionService - provides functions that make $http get/post requests to the backend

### Note:
If you download the source code and attempt to run the app on your computer, you will need a public access token from Mapbox. Otherwise, the embedded maps (in progress) will not work. Store your access token under assets/js/mapboxApi.js like so:
```javascript
const pubAccessToken = 'myPublicAccessTokenString';
```
When you create a Mapbox account, you will also need to go to the [Mapbox Editor](https://www.mapbox.com/studio/classic/projects/) and create a new project. Store the project ID in assets/js/mapboxApi.js:
```javascript
const projectId = 'myMapboxEditorProjectId';
```

### Also note:
Nodemailer will not work without a valid "from" email address and password. You can use Google, Yahoo, etc., but you will either use [OAuth2 authentication](https://nodemailer.com/using-gmail/), or modify security settings on your email account to allow "Less Secure" apps. Insert your username and password (for testing purposes) into lines 9 and 10 of /server/routes/index.js:
```javascript
const FROM_ADDRESS = 'myemail@mail.com';
const FROM_PASS = 'mypassword';
```