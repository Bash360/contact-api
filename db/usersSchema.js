const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	firstName: { type: String, maxlenght: 20, required: true, trim: true },
	lastName: { type: String, maxlenght: 20, required: true, trim: true },
	phone: { type: String, lenght: 11, required: true, trim: true },
	gender: { type: String, enum: ['male', 'female'], required: true, trim: true },
	email: { type: String, required: true },
	blocked: { type: Boolean, enum: [true, false], required: true, default: false }
});
module.exports = userSchema;