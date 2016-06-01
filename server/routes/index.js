var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt-nodejs');
var randtoken = require('rand-token');

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

	var salt = bcrypt.genSaltSync(10);
	var token = randtoken.generate(32);
	var newUser = {
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, salt),
		email: req.body.email,
		token: token
	}

	connection.query('SELECT * FROM `accounts` WHERE `username` = ?', [newUser.username],
		function(err, results, fields) {
			if (err) throw err;

			if (results.length > 0) {
				res.json({ failure: 'notUnique' });
			} else {
				connection.query('INSERT INTO `accounts` SET ?', newUser, function(err, result) {
					if (err) throw err;
					else {
						res.json({
							success: 'added',
							token: token
						});
					}
				});
			}
		});
});


router.post('/login', function(req, res, next) {
	var token = randtoken.generate(32);

	connection.query('SELECT * FROM `accounts` WHERE `username` = ?', [req.body.username],
		function(err, results, fields) {
			if (err) throw err;

			if (results.length < 1) {
				res.json({ failure: 'noUser'});
			} else {

				var loginResult = bcrypt.compareSync(req.body.password, results[0].password);
				
				if (loginResult) {

					connection.query('UPDATE `accounts` SET `token` = ? WHERE `username` = ?',
						[token, req.body.username], function(err, results) {
						if (err) throw err;
						else {
							res.json({
								success: 'match',
								token: token
							});
						}
					});
				} else {
					res.json({ failure: 'noMatch' });
				}
			}
	});
});


router.post('/cancel', function(req, res, next) {
	console.log(req.body);
});


module.exports = router;
