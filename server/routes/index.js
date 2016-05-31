var express = require('express');
var router = express.Router();

// create a connection to the final-project database
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'test',
	password: 'testPassword!!1',
	database: 'final-project'
});


router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


router.post('/register', function(req, res, next) {
	console.log(req.body);
	
	/// mysql connection...activate!	
	connection.connect();

	connection.query('SELECT * FROM users', function(err, rows, fields) {
		if (err) throw err;
		console.log('The first row contains', rows[0].name);
	});

	connection.end();
	res.redirect('/');
});


router.post('/login', function(req, res, next) {
	console.log(req.body);
	
	/// mysql connection...activate!	
	connection.connect();

	connection.query('SELECT * FROM users', function(err, rows, fields) {
		if (err) throw err;
		console.log('The first row contains', rows[0].name);
	});

	connection.end();
	res.redirect('/');
});


router.post('/cancel', function(req, res, next) {
	console.log(req.body);
	
	/// mysql connection...activate!	
	connection.connect();

	connection.query('SELECT * FROM users', function(err, rows, fields) {
		if (err) throw err;
		console.log('The first row contains', rows[0].name);
	});

	connection.end();
	res.redirect('/');
});


module.exports = router;
