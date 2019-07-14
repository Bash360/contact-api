const express = require('express');
const joi = require('@hapi/joi');

const router = express.Router();
const schema: object = {
	firstName: joi
		.string()
		.min(5)
		.required(),
	lastName: joi
		.string()
		.min(5)
		.required(),
	email: joi
		.string()
		.email()
		.required(),
	phone: joi.string().max(11).required,
	gender: joi
		.string()
		.max(6)
		.min(4).required,
	blocked: joi
		.number()
		.min(0)
		.max(1).optional
};
router.get('/', function(req, res) {
	res.send('home').status(200);
});
router.get('api/users', (req, res) => {
	res.send(201);
});
router.get('api/users?id', (req, res, next) => {});
router.get('api/users/blocked', (req, res) => {});
router.post('api/users', (req, res) => {});
router.put('api/users', (req, res) => {});
router.delete('api/users', (req, res) => {});

module.exports = router;
