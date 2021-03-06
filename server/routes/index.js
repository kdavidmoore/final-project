var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt-nodejs');
var randtoken = require('rand-token');
var secrets = require('./secrets');
var stripe = require('stripe')(secrets.getSecrets().STRIPE_KEY);

// create a connection to the final-project database
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: secrets.getSecrets().DB_USER,
	password: secrets.getSecrets().DB_PASSWORD,
	database: 'ag-labs'
});

// this function only gets called in the payments route
function sendReceipt(orderType, orderId, sendToAddress) {
	var transporter = nodemailer.createTransport({
		service: 'Yahoo',
		auth: {
			user: secrets.getSecrets().FROM_ADDRESS,
			pass: secrets.getSecrets().FROM_PASS
		}
	});

	var emailBody = '<p>Dear customer,</p>' +
					'<p>Thank you for your recent '+ orderType +' sample submission.&nbsp;' +
					'Your order number is: '+ orderId +'.</p>' +
					'<p>Sincerely,</p>' +
					'<p><a href="http://ag.kdavidmoore.com">ABC Cooperative Extension</a></p>';
	var mailOptions = {
		from: secrets.getSecrets().FROM_ADDRESS,
		to: sendToAddress,
		subject: 'Thanks for your recent sample submission',
		html: emailBody
	}

	transporter.sendMail(mailOptions, function(err, info) {
		if (err) {
			throw err;
		} else {
			console.log('Message sent: ' + info.response);
		}
	});
}

/**************/
/* GET routes */
/**************/

// home route is for testing purposes only
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/getLabServices', function(req, res, next) {
	connection.query('SELECT * FROM services ORDER BY serviceType', function(err, results, fields) {
		if (err) {
			throw err;
		} else {
			res.json({ results });
		}
	});
});

router.get('/checkToken/:token', function(req, res, next) {
	if (req.params.token == undefined) {
		res.json({ failure: 'noToken' });
	} else {
		// the database is updated with the current token each time the user logs in (see the /login route)
		connection.query('SELECT * FROM accounts WHERE token = ?', [req.params.token],
			function(err, results, fields) {
				if (err) {
					throw err;
				} else if (results.length > 0) {
					res.json({ success: 'validated' });
				} else {
					res.json({ failure: 'badToken' });
				}
			});
	}
});

router.get('/getUserId/:token', function(req, res, next) {
	if (req.params.token == undefined) {
		res.json({ failure: 'noToken' });
	} else {
		connection.query('SELECT id FROM accounts WHERE token = ?', [req.params.token],
			function(err, results, fields) {
				if (err) {
					throw err;
				} else if (results.length > 0) {
					res.json({ id: results[0] });
				} else {
					res.json({ failure: 'badToken' });
				}
			});
	}
});

router.get('/getOrderId/:user', function(req, res, next) {
	connection.query('SELECT id FROM orders WHERE userId = ? ORDER BY timestamp DESC',
		[req.params.user], function(err, results, fields) {
			if (err) {
				throw err;
			} else {
				if (results.length > 0) {
					res.json({ orderId: results[0].id });
				} else {
					res.json({ failure: 'problemGettingOrderId'});
				}
			}
		});
});

router.get('/getOrders/:user', function(req, res, next) {
	connection.query('SELECT id, timestamp, orderType, orderStatus FROM orders WHERE userId = ? ORDER BY timestamp DESC',
		[req.params.user], function(err, results, fields) {
			if (err) {
				throw err;
			} else {
				res.json({ results });
			}
	});
});

router.get('/getOrderData/:id', function(req, res, next) {
	connection.query('SELECT orderData FROM orders WHERE id = ?', [req.params.id],
		function(err, results, fields) {
			if (err) {
				throw err;
			} else {
				res.json({ orderData: results[0] });
			}
	});
});

/***************/
/* POST routes */
/***************/

router.post('/register', function(req, res, next) {
	var token = randtoken.generate(32);
	var newUser = {
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
		email: req.body.email,
		token: token
	};

	connection.query('SELECT * FROM accounts WHERE username = ?', [newUser.username],
		function(err, results, fields) {
			if (err) {
				throw err;
			} else if (results.length > 0) {
				res.json({ failure: 'notUnique' });
			} else {
				connection.query('INSERT INTO accounts SET ?', newUser, function(err, result) {
					if (err) {
						throw err;
					} else {
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
	connection.query('SELECT * FROM accounts WHERE username = ?', [req.body.username],
		function(err, results, fields) {
			if (err) {
				throw err;
			} else if (results.length > 0) {
				var loginResult = bcrypt.compareSync(req.body.password, results[0].password);
				if (loginResult) {
					var token = randtoken.generate(32);
					connection.query('UPDATE accounts SET token  = ? WHERE username = ?',
						[token, req.body.username], function(err, result) {
						if (err) {
							throw err;
						} else {
							res.json({
								success: 'match',
								token: token
							});
						}
					});
				} else {
					res.json({ failure: 'noMatch' });
				}
			} else {
				res.json({ failure: 'noUser' });
			}
		});
});

router.post('/postSampleData', function(req, res, next) {
	// when a sample submission form is posted, add the sample data/metadata to the database
	connection.query('INSERT INTO orders SET ?', req.body, function(err, result){
		if (err) {
			throw err;
		} else {
			res.json({ success: "added" });
		}
	});
});

router.post('/payment', function(req, res, next) {
	stripe.charges.create({
		amount: req.body.stripeAmount, // obtained with hidden input field
		currency: 'usd',
		source: req.body.stripeToken, // obtained with stripe
		description: "Charge for " + req.body.stripeEmail // obtained with hidden input field
	}, function(err, charge) {
		if (err && err.type === 'StripeCardError') {
			res.render('error', { message: 'There was a problem processing your Stripe payment.' });
		} else {
			connection.query('UPDATE orders SET orderStatus = ? WHERE id = ?',
				['paid', req.body.orderId], function(err, result) {
					if (err) {
						throw err;
					} else {
						sendReceipt(req.body.orderType, req.body.orderId, req.body.stripeEmail);
						res.render('index', {
							title: 'Success',
							body: 'Your order has been processed.'
						});
					}
			});
		}
	});
});

router.post('/results', function(req, res, next) {
	var id = req.body.orderId;
	connection.query('SELECT results FROM results WHERE orderId = ?', [id],
		function(err, results, fields) {
		if (err) {
			throw err;
		} else if (results.length > 0) {
			// send back the results from the database in JSON format
			res.json({ results: JSON.parse(results[0].results) });
		} else {
			// if no results are found, generate new results
			var newResults = [];
			for (var i=0; i<req.body.options.length; i++) {
				newResults.push(Math.random() * 10);
			}
			var resultsObj = {
				results: newResults
			}
			connection.query('INSERT INTO results SET orderId = ?, orderType = ?, results = ?',
				[id, req.body.orderType, JSON.stringify(resultsObj)], function(err, result) {
				if (err) {
					throw err;
				} else {
					// an object inside an object?
					// ugly, but it has to be consistent with the way that existing results are sent back
					res.json({ results: resultsObj });
				}
			});
		}
	});
});

router.post('/cancel', function(req, res, next) {
	connection.query('DELETE FROM orders WHERE id = ?', [req.body.orderId], function(err, result) {
		if (err) {
			throw err;
		} else {
			res.json({success: "deleted"});
		}
	});
});

module.exports = router;
