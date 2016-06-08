var express = require('express');
var router2 = express.Router();

router2.get('/test', function(req, res, next) {
	console.log('This is the test route.');
	
	res.render('index', {
		title: 'Test',
		body: 'This is only a test.'
	});
});

module.exports = router2;