var express = require('express');
var router = express.Router();

var db = require('./service.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('news-list', { title: 'Express', news: db.all() });
});

router.get('/create', function(req, res, next) {
	res.render('news-create', { title: 'Express', errors: [] });
});

router.post('/create', function(req, res, next) {
	var title = req.body.title;
	var desc  = req.body.description;
	var text  = req.body.text;

	var errors = [];
	if (!title) {
		errors.push('O Título deve ser preenchido.');
	}

	if (!desc) {
		errors.push('A Descrição deve ser preenchido.');
	}

	if (!text) {
		errors.push('O Texto deve ser preenchido.');
	}

	if (errors.length) {
		res.render('news-create', { title: 'Express', errors: errors });	
	} else {
		db.create(title, desc, text, function () {
			res.redirect('/news');
		});
	}
});

router.get('/:id/delete', function(req, res, next) {
	db.remove(req.params.id, function () {
		res.redirect('/news');
	});
});
router.get('/:id', function(req, res, next) {
	db.find(req.params.id, function (err, data) {
		console.log(err, data);
		res.render('news-view', { title: 'Express', news: data });
	});
});

module.exports = router;
