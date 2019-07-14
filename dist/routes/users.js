const express = require('express');
const router = require('express').Router();
const joi = require('@hapi/joi');


const schema = {
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
router.get('api/users', (req, res) => {
	res.send('welcome');
});
router.get('api/users?id', (req, res) => {
 res.send('welcome');
});
router.get('api/users/blocked', (req, res) => {
});
router.post('api/users', (req, res) => {});
router.put('api/users', (req, res) => {});
router.delete('api/users', (req, res) => {});

module.exports = router;
