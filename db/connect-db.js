const mysql = require('mysql');
	const db = mysql.createConnection({
		host: '127.0.0.1',
		user: 'guest',
		password: 'password666',
		database: 'contact'
	});
db.connect((error) => {
	if (error) throw error;
	console.log('connection successful')
});

module.exports = {};

