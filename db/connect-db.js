const mysql = require('mysql');
const db = mysql.createConnection({
	host: '127.0.0.1',
	user: 'guest',
	password: 'password666',
	database: 'contact',
	multipleStatements: true
});
db.connect(error => {
	if (error) {
		console.log(error.message);
	} else {
		console.log('connection successful');
	}
});
function searchContact(search) {
	return new Promise((resolve, reject) => {
		try {
			if (db) {
				db.query(
					"select * from users where firstName like '%" + search + "%' or lastName like '%" + search + "%' ",
					(error, results) => {
						if (error) reject(error);
						resolve(results);
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
function createUser(firstName, lastName, email, phone, gender, blocked = 0) {
	return new Promise((resolve, reject) => {
		try {
			if (db) {
				db.query(
					'INSERT INTO users SET firstName=?,lastName=?,email=?,phone=?,gender=?,blocked=?',
					[firstName, lastName, email, phone, gender, blocked],
					(error, results) => {
						if (error) throw error;
						resolve({ contactID: results.insertId, noOfContactsCreated: results.affectedRows });
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
function getSingleUser(id) {
	return new Promise((resolve, reject) => {
		try {
			if (db) {
				db.query('Select * from  users where contactID=?', [id], (error, result) => {
					if (error) throw error;
					if (result.length === 0) reject('invalid id');
					resolve(result);
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
					let sqlQuery =
						'Update users set firstName=?,lastName=?,email=?,phone=?, gender=? where contactID=? ; select * from users  where contactID=?';
					db.query(sqlQuery, [firstName, lastName, email, phone, gender, id, id], (error, result) => {
						if (error) throw error;
						resolve(result[1]);
					});
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
				let sqlQuery = 'Update users set blocked=1 where contactID=?; select * from users where contactID=?';
				db.query(sqlQuery, [id, id], (error, result) => {
					if (error) throw error;
					if (result[0].affectedRows === 0) reject('invalid id');
					resolve(result[1]);
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
	return new Promise((resolve, reject) => {
		try {
			if (db) {
				db.query('delete from users where contactID=?', [id], (error, result) => {
					if (error) throw error(error.message);
					if (result.affectedRows === 0) reject('invalid id');
					resolve(result.affectedRows);
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
	deleteUser,
	searchContact
};
