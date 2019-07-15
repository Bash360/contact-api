const express = require('express');
const joi = require('@hapi/joi');
const {
createUser,
	getAllUsers,
	getNonBlockedUsers,
	getSingleUser,
	getBlockedUsers,
	updateUser,
	blockUser,
	deleteUser
} = require('../db/connect-db.js');
const userRouter = express.Router();

const postSchema = {
	firstName: joi
		.string()
		.min(3)
		.required(),
	lastName: joi
		.string()
		.min(3)
		.required(),
	email: joi
		.string()
		.email()
		.required(),
	phone: joi.string().max(11).required(),
	gender: joi
		.string()
		.max(6)
		.min(4)
		.required(),
	blocked: joi.number().max(1).optional()
};
userRouter.get('/api/users', (req, res) => {
  getAllUsers().then((data) => {  res.status(200).json(data)}).catch((error) => {  res.send(error)});
});
userRouter.get('/api/users?id', (req, res) => {
  res.send(req);
  // getSingleUser(req.query.id).then((data) => { res.status(200).json(data); }).catch((error) => { res.status(400).json(error) });
});
userRouter.get('/api/users/blocked', (req, res) => {
	res.send('welcome');
});
userRouter.post('/api/users', (req, res) => {
	const validated = joi.validate(req.body, postSchema, { abortEarly: false });
	const { error } = validated;
	if (error) {
		let errors = error.details.reduce((errors, error) => {
			return errors + ' \n' + error.message;
		}, ' ');
		res.status(400).send(errors);
	} else {
		let { firstName, lastName, gender, phone, email } = req.body;

		createUser(firstName, lastName, phone, gender, email)
			.then(dbresponse => {
				res.status(200).json(dbresponse);
			})
			.catch(error => {
				res.send(error);
			});
	}
});
userRouter.put('/api/users', (req, res) => {
	res.send('welcome');
});
userRouter.delete('/api/users', (req, res) => {
	res.send('welcome');
});

module.exports = userRouter;
