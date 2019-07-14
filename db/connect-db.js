const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost:27017/contact', { useNewUrlParser: true })
	.then(() => {
		console.log('connected to mongo db');
	})
	.catch(error => {
		console.error(error.message);
	});
mongoose.set('useFindAndModify', false);
const userSchema = new mongoose.Schema({
	firstName: { type: String, maxlenght: 20, required: true, trim: true },
	lastName: { type: String, maxlenght: 20, required: true, trim: true },
	phone: { type: String, lenght: 11, required: true, trim: true },
	gender: { type: String, enum: ['male', 'female'], required: true, trim: true },
	email: { type: String, required: true },
	blocked: { type: Boolean, enum: [true, false], required: true, default: 0 }
});
const User = mongoose.model('user', userSchema);

function createUser(firstName, lastName, phone, gender, email, blocked = false) {
	return new Promise(async (resolve, reject) => {
		try {
			const user = new User({ firstName, lastName, phone, gender, email, blocked });
			const result = await user.save();
			resolve(result);
		} catch (error) {
			reject(error.message);
		}
	});
}
function getUsers() {
	return new Promise(async (resolve, reject) => {
		try {
			const users = await User.find().select({
				firstName: 1,
				lastName: 1,
				gender: 1,
				email: 1,
				phone: 1,
				blocked: 1
			});
			resolve(users);
		} catch (error) {
			reject(error.message);
		}
	});
}
function getUsersNotBlocked() {
	return new Promise(async (resolve, reject) => {
		try {
			const users = await User.find({ blocked: false }).select({
				firstName: 1,
				lastName: 1,
				gender: 1,
				email: 1,
				phone: 1,
				blocked: 1
			});
			resolve(users);
		} catch (error) {
			reject(error);
		}
	});
}
function getBlockedUsers() {
	return new Promise(async (resolve, reject) => {
		try {
			const users = await User.find({ blocked: true }).select({
				firstName: 1,
				lastName: 1,
				gender: 1,
				email: 1,
				phone: 1,
				blocked: 1
			});
			resolve(users);
		} catch (error) {
			reject(error);
		}
	});
}
function getSingleUser(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const users = await User.find({ _id:id }).select({
				firstName: 1,
				lastName: 1,
				gender: 1,
				email: 1,
				phone: 1,
				blocked: 1
			});
			resolve(users);
		} catch (error) {
			reject(error);
		}
	});
}
function updateUser(id, details) {
	return new Promise(async (resolve, reject) => {
		try {
			let userRetrieved = await getSingleUser(id);
			let user = userRetrieved[0];
			if (user) {
				let {
					firstName = user.firstName,
					lastName = user.lastName,
					gender = user.gender,
					phone = user.phone,
					email = user.email,
					blocked = user.blocked
				} = details;
				const result = await User.findOneAndUpdate(
					{
						_id: id
					},
					{
						$set: {
							firstName,
							lastName,
							gender,
							phone,
							email,
							blocked
						}
					},
					{ new: true }
				);
				resolve(result);
			} else {
				throw new Error('id not found');
			}
		} catch (error) {
			reject(error.message);
		}
	});
}
function blockUser(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await User.findOneAndUpdate(
				{
					_id: id
				},
				{
					$set: {
						blocked: true
					}
				},
				{ new: true }
			);
			resolve(result);
		} catch (error) {
			reject(error.message);
		}
	});
}
function deleteUser(id) { 
	return new Promise(async (resolve, reject) => {
		try {
			let result = await User.deleteOne({ _id: id });
			resolve(result);

		} catch (error) {
			reject(error.message);
		}
	 });
}

module.exports = { createUser, getUsers, getUsersNotBlocked, getBlockedUsers, updateUser, getSingleUser, blockUser };
