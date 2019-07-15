const mysql = require('mysql');
const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'guest',
	password: 'password666',
	database: 'contact'
});
db.connect(error => {
	if (error) {
		console.log(error.message);
	} else {
		console.log('connection successful');
	}
});

function createUser(firstName, lastName, email, phone, gender, blocked = 0) {
	return new Promise((resolve, reject) => {
		try {
			if (db) {
				db.query(
					'INSERT INTO users SET firstName=?,lastName=?,email=?,phone=?,gender=?,blocked=?',
					[firstName, lastName, email, phone, gender, blocked],
					(error, results) => {
						if (error) throw error;
						resolve({ id: results.insertId, affectedRows: results.affectedRows });
					}
				);
			} else {
				throw new Error('cannot connect to database at the moment');
			}
		} catch (error) {
			reject(error.message);
		}
	});
}
function getAllUsers() {
	return new Promise((resolve, reject) => {
		try {
			if (db) {
				db.query('Select * from users', (error, results) => {
					if (error) throw error;
					resolve({ results });
				});
			} else {
				throw new Error('cannot connect to database at the moment');
			}
		} catch (error) {
			reject(error.message);
		}
	});
}
function getSingleUser(id) {
	return new Promise((resolve, reject) => {
		try {
			if (db) {
				db.query('Select * from  users where contactID=?', [id], (error, results) => {
					if (error) throw error;
					resolve(results);
				});
			} else {
				throw new Error('cannot connect to database at the moment');
			}
		} catch (error) {
			reject(error.message);
		}
	});
}
function getNonBlockedUsers() {
	return new Promise((resolve, reject) => {
		try {
			if (db) {
				db.query('Select * from  users where blocked=0', (error, results) => {
					if (error) throw error;
					resolve(results);
				});
			} else {
				throw new Error('cannot connect to database at the moment');
			}
		} catch (error) {
			reject(error.message);
		}
	});
}
function getBlockedUsers() {
	return new Promise((resolve, reject) => {
		try {
			if (db) {
				db.query('Select * from  users where blocked=1', (error, results) => {
					if (error) throw error;
					resolve(results);
				});
			} else {
				throw new Error('cannot connect to database at the moment');
			}
		} catch (error) {
			reject(error.message);
		}
	});
}
function updateUser(id, details) {
	return new Promise(async (resolve, reject) => {
		try {
			if (db) {
				let user = await getSingleUser(id);

				if (user.length != 0) {
					let userDetails = user[0];
					let {
						firstName = userDetails.firstName,
						lastName = userDetails.lastName,
						email = userDetails.email,
						phone = userDetails.phone,
						gender = userDetails.gender
					} = details;
					db.query(
						'Update users set firstName=?,lastName=?,email=?,phone=?, gender=? where contactID=?',
						[firstName, lastName, email, phone, gender, id],
						(error, results) => {
							if (error) throw error;
							resolve(results);
						}
					);
				} else {
					throw new Error('contact ID invalid');
				}
			} else {
				throw new Error('cannot connect to database at the moment');
			}
		} catch (error) {
			reject(error.message);
		}
	});
}
function blockUser(id) {
	return new Promise(async (resolve, reject) => {
		try {
			if (db) {
				db.query('Update users set blocked=1 where contactID=?', [id], (error, results, f) => {
					if (error) throw error;
					resolve(results);
				});
			} else {
				throw new Error('cannot connect to database at the moment');
			}
		} catch (error) {
			reject(error.message);
		}
	});
}
function deleteUser(id) {
	return new Promise(async (resolve, reject) => {
		try {
			if (db) {
				db.query('delete from users where contactID=?', [id], (error, results, f) => {
					if (error) return reject(error.message);
					resolve(results);
				});
			} else {
				throw new Error('cannot connect to database at the moment');
			}
		} catch (error) {
			reject(error.message);
		}
	});
}

module.exports = {
	createUser,
	getAllUsers,
	getNonBlockedUsers,
	getSingleUser,
	getBlockedUsers,
	updateUser,
	blockUser,
	deleteUser
};
