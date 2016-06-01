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
	console.log(req.body);

	var salt = bcrypt.genSaltSync(10);
	var token = randtoken.generate(32);
	var newUser = {
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, salt),
		email: req.body.email
	}

	connection.query('SELECT * FROM `accounts` WHERE `username` = ?', [newUser.username],
		function(err, rows, fields) {
		if (err) throw err;

		if (rows.length > 0){
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
	console.log(req.body);
});


router.post('/cancel', function(req, res, next) {
	console.log(req.body);
});


module.exports = router;
