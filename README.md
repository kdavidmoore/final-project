# Ag Labs
This full-stack eCommerce app is my final project for the 16 Week Immersive Bootcamp at [DigitalCrafts](http://digitalcrafts.com). The app allows users to submit soil/water sample information to a Cooperative Extension service and view (random) test results electronically. It's basically a MEAN stack app, except I used MySQL instead of MongoDB as the database.

--------------------
[demo here](http://ag.kdavidmoore.com)

## Table of Contents
- [Example / Usage](#example--usage)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Questions and Issues](#questions-and-issues)

## Example / Usage
Upon visiting the app in your browser, the first thing to do is register by clicking the "Register" link on the navbar. Fill out the form with your information and click "Submit". Then you will be taken to the "Services" page, where you get start filling out an order form for soil or water samples. Once your order is complete and paid for, click the link to "View orders" to see whether your test results are ready.

**Insert GIF here**

## Getting Started
### Installing dependencies
After downloading the source code, open a terminal window and install the Node.js package dependencies:
```javascript
cd my-project-directory/server
npm install
```
Then run nodemon to start the Node.js server:
```javascript
nodemon
```

### Placing API keys and other constants
If you download the source code and attempt to run the app on your computer, you will need to create an account with [Mapbox](https://www.mapbox.com/) and obtain a public access token. Otherwise, the embedded maps will not work. Store your access token under `/app/constants/mapbox.constant.js` using the following format:
```javascript
const MAPBOX_ACCESS_TOKEN = 'my_public_access_token';
```
After obtaining your access token, go to the [Mapbox Editor](https://www.mapbox.com/studio/classic/projects/) and create a new project. Store the project ID in /app/constants/mapbox.constant.js:
```javascript
const MAPBOX_PROJECT_ID = 'my_mapbox_editor_project_id';
```

Similarly, [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start) requires a special API key, which can be stored as `GOOGLE_MAPS_API_KEY` in `/app/constants/google-maps.constant.js`.

Nodemailer will not work without a valid "from" email address and password. You can use Google, Yahoo, or another email provider, but you will most likely need to either use [OAuth2 authentication](https://nodemailer.com/using-gmail/) or modify your email account's security settings to allow "Less Secure" apps. Store your username and password in `/server/routes/secrets.js`, along with your Stripe key and MySQL login info:
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

Finally, the `API_KEY` constant should point to the host and port number that your Node.js server is running on. Store this constant in `/app/constants/api-url.constant.js`:
```javascript
const API_KEY = 'http://localhost:3090';
```

## Architecture
### Third party libraries/frameworks/modules
* Bootstrap 3 (requires jQuery)
* [Compass](http://compass-style.org/)
* AngularJS v1.5.5
* [AngularUI Router](https://github.com/angular-ui/ui-router)
* [Leaflet.js](http://leafletjs.com/)
* [Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/start)
* [Angular Chart](https://jtblin.github.io/angular-chart.js/) (requires Chart.js)
* [Express](http://expressjs.com/)
* Node.js [driver](https://www.npmjs.com/package/mysql) for MySQL
* Node.js [module](https://stripe.com/docs/libraries) for Stripe
* [Nodemailer](http://nodemailer.com/)
* [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs)
* [rand-token](https://www.npmjs.com/package/rand-token)

### Custom AngularJS services
* UserAuthService - makes an $http GET request to the Node server (i.e., the API) to make sure that the token stored in $cookies is also stored in the MySQL database.
* GetRequestService - provides functions that make $http GET requests to the the API and send back data to the controllers.
* PostRequestService - provides functions that make $http POST requests to the API and send back data to the controllers.
* GeocodingService - makes an $http GET request to Google Maps Geocoding API to look up the geographic coordinates of the sample address.
* ResultsService - sends order info to the API, which generates results for that order or sends back existing results; sends back results to the "results" controller.

### Detailed description of features
* User can register and log in.
* User login status is tracked using rand-token (which generates a 32-character alphanumeric token) and ngCookies (which stores the random token received from the API).
* Input fields validated using AngularJS.
* Error messages and services-forms load in nested views using AngularUI Routing.
* Form data are submitted to the API using custom AngularJS services that abstract the $http requests.
* Passwords are encrypted using bcrypt-nodejs before being stored in the database.
* Nodemailer sends the user a confirmation email when order is complete and paid for.
* User can view the status of each order (unpaid/paid) from the "View orders" page.
* User can view the location of their samples on a map using Google Maps Geocoding API + Leaflet + Mapbox.
* If the order status is "paid", the user can view results for each order using Angular Chart.

### Database Schema
MySQL
![Schema](http://i66.tinypic.com/14njn1y.png)

## Questions and Issues
Please direct any questions about the app to [Keith Moore](http://kdavidmoore.com/).