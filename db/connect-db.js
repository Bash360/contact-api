const mysql = require('mysql');
const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'guest',
	password: 'password666',
	database: 'contact'
});
db.connect(error => {
	if (error) throw error;
	console.log('connection successful');
});
 function createUser(firstName, lastName, email, phone, gender, blocked = 0) {
	if (db) {
		return new Promise((resolve, reject) => {
			db.query(
				'INSERT INTO users SET firstName=?,lastName=?,email=?,phone=?,gender=?,blocked=?',
				[firstName, lastName, email, phone, gender, blocked],
				(error, results) => {
					if (error) return reject(error.message);
					resolve({ id: results.insertId, affectedRows: results.affectedRows });
				}
			);
		});
	}

}
function updateUser(id,...rest) { 

}


module.exports = { createUser };
