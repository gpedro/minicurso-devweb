var routes = require('./routes/index');
var news   = require('./routes/news');

module.exports = function (app) {

	app.use('/', routes);
	app.use('/news', news);

};