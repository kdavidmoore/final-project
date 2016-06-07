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
* Sample submission forms are submitted to the server using a custom http abstraction service.
* Nodemailer sends the user a confirmation email when order is complete and paid for.
* User can view the status of each order (unpaid/paid) from the "View orders" page.

## Built with...
* Bootstrap 3 (requires jQuery)
* [Compass](http://compass-style.org/)
* [Leaflet.js](http://leafletjs.com/) - this will display sample locations using geocoding
* AngularJS v1.5.5
* [AngularUI Router](https://github.com/angular-ui/ui-router)
* [Express](http://expressjs.com/)
* Node.js [driver](https://www.npmjs.com/package/mysql) for MySQL
* Node.js [module](https://stripe.com/docs/libraries) for Stripe
* [Nodemailer](http://nodemailer.com/)

### Custom AngularJS services
* UserAuthService - provides a function to make sure that the token stored in $cookies is also stored in the MySQL database
* HttpAbstractionService - provides functions that make $http get/post requests to the Node server

### A note on using the leaflet map:
If you download the source code and attempt to run the app on your computer, you will need a public access token from Mapbox. Otherwise, the embedded maps (in progress) will not work. Store your access token under assets/js/mapboxApi.js like so:
```javascript
const pubAccessToken = 'myPublicAccessTokenString';
```
When you create a Mapbox account, you will also need to go to the [Mapbox Editor](https://www.mapbox.com/studio/classic/projects/) and create a new project. Store the project ID in assets/js/mapboxApi.js:
```javascript
const projectId = 'myMapboxEditorProjectId';
```

### A note on using Nodemailer, Stripe, and MySQL:
Nodemailer will not work without a valid "from" email address and password. You can use Google, Yahoo, etc., but you will need to use either [OAuth2 authentication](https://nodemailer.com/using-gmail/), or modify your email account's security settings to allow "Less Secure" apps. Store your username and password in /server/routes/secrets.js, along with your Stripe key and MySQL login info:
```javascript
module.exports = {
	getSecrets: function() {
		return {
			STRIPE_KEY: 'my_stripe_test_key',
			DB_USER: 'my_mysql_username',
			DB_PASSWORD: 'my_mysql_password',
			FROM_ADDRESS: 'my_email_address',
			FROM_PASS: 'my_email_password'
		};
	}
};
```