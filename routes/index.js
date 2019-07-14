const express = require('express');
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function(req, res) {
	res.render('index', { title: 'Contact Page' });
});

module.exports = indexRouter;
