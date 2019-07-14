const mongodb = require('mongodb');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	firstName: { type: string, maxlenght: 20, required: true, trim: true },
	lastName: { type: string, maxlenght: 20, required: true, trim: true },
	phone: { type: string, lenght: 11, required: true, trim: true },
	gender: { type: string, enum: ['male', 'female'], required: true, trim: true },
	email: { type: string, required: true },
	blocked: { type: Number, enum: [0, 1], required: true, default: 0 }
});
module.exports.user = mongoose.model('user', userSchema);
