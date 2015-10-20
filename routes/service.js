'use strict';

var fs = require('fs');
var dbFile = __dirname + '/news.json';

module.exports = {
	all: retrieveNews,
	create: create,
	find: find,
	remove: remove
};

function retrieveNews() {
	var rawData = fs.readFileSync(dbFile);
	var data = rawData.toString();

	if (!data.length) {
		data = '[]';
	}

	data = JSON.parse(data) || [];
	data = data.sort(function (a, b) {
		if (a.id < b.id) {
			return 1;
		}

		if (a.id > b.id) {
			return -1;
		}

		return 0;
	});

	return data;
}

function persistNews(data) {
	return fs.writeFileSync(dbFile, JSON.stringify(data) || '[]');
}

function create (title, description, text, cb) {
	var db = retrieveNews();

	var id = new Date().getTime();
	db.push({
		id: id,
		title: title,
		description: description,
		text: text,
		created_at: new Date()
	});

	persistNews(db);
	cb();
}

function find (id, cb) {
	var db = retrieveNews();

	var items = db.filter(function (item) {
		return item.id == id;
	});

	var err = !items.length;
	var data = (items.length > 0) ? items[0] : null;

	cb(err, data);
}

function remove (id, cb) {
	var db = retrieveNews();

	var data = db.filter(function (item) {
		return item.id != id;
	});

	persistNews(data);
	cb();

}