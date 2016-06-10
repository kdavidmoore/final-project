# Final Project

This full-stack eCommerce app is my final project for the 16 Week Immersive Bootcamp at [DigitalCrafts](http://digitalcrafts.com). The app allows users to submit soil/water sample information to a Cooperative Extension service and view (random) test results electronically. It's basically a MEAN stack app, except I used MySQL instead of MongoDB as the database. Why MySQL? Well, because I like the query syntax better.

## Live demo
* Screenshot goes here
* Link to demo goes here

## Features
* User can register and log in.
* User login status is tracked using ngCookies.
* Input fields validated using AngularJS.
* Error messages and services-forms load in nested views using AngularUI Routing.
	- Do we need to load them in nested views? Of course not; it's just a demonstration of AngularUI Router. Otherwise we could just use ng-show, jQuery, or even vanilla JavaScript.
* Form data are submitted to the API using custom AngularJS services that abstract the $http requests.
* Nodemailer sends the user a confirmation email when order is complete and paid for.
* User can view the status of each order (unpaid/paid) from the "View orders" page.
* User can view the location of their samples on a map using Google Maps Geocoding API + Leaflet + Mapbox.
* If the order status is "paid", the user can view results for each order.

## Built with
* Bootstrap 3 (requires jQuery)
* [Compass](http://compass-style.org/)
* [Leaflet.js](http://leafletjs.com/)
* [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start#sample-request)
* AngularJS v1.5.5
* [AngularUI Router](https://github.com/angular-ui/ui-router)
* [Express](http://expressjs.com/)
* Node.js [driver](https://www.npmjs.com/package/mysql) for MySQL
* Node.js [module](https://stripe.com/docs/libraries) for Stripe
* [Nodemailer](http://nodemailer.com/)

### Custom AngularJS services
* UserAuthService - makes an $http GET request to the Node server (i.e., the API) to make sure that the token stored in $cookies is also stored in the MySQL database.
* GetRequestService - provides functions that make $http GET requests to the the API and send back data to the controllers.
* PostRequestService - provides functions that make $http POST requests to the API and send back data to the controllers.
* GeocodingService - makes an $http GET request to Google Maps Geocoding API to look up the geographic coordinates of the sample address.
* ResultsService - sends order info to the API, which generates results for that order or sends back existing results; sends back results to the 'results' controller.

## Build process
After downloading the source code, cd into the project directory and install the Node package dependencies:
```javascript
cd ~/my-project-directory/server
npm install
```
Then run nodemon to start the server:
```javascript
nodemon
```
See the below note for more information on getting the project to run on your computer.

### A note on API keys and other constants
If you download the source code and attempt to run the app on your computer, you will need a public access token from Mapbox. Otherwise, the embedded maps will not work. Store your access token under `/app/constants/mapbox.constant.js` like so:
```javascript
const MAPBOX_ACCESS_TOKEN = 'my_public_access_token';
```
When you create a Mapbox account, you will also need to go to the [Mapbox Editor](https://www.mapbox.com/studio/classic/projects/) and create a new project. Store the project ID in /app/constants/mapbox.constant.js:
```javascript
const MAPBOX_PROJECT_ID = 'my_mapbox_editor_project_id';
```

Similarly, Google Maps Geocoding API requires an API key, which can be stored as `GOOGLE_MAPS_API_KEY` in `/app/constants/google-maps.constant.js`.

Nodemailer will not work without a valid "from" email address and password. You can use Google, Yahoo, etc., but you will need to use either [OAuth2 authentication](https://nodemailer.com/using-gmail/), or modify your email account's security settings to allow "Less Secure" apps. Store your username and password in `/server/routes/secrets.js`, along with your Stripe key and MySQL login info:
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

Finally, the `API_KEY` constant (stored in `/app/constants/api-url.constant.js`) should point to `http://localhost:3090`.
