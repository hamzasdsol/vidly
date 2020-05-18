const mongoose = require('mongoose');
const Joi = require('joi');

// Customer Document Schema
const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: Boolean,
    name: String,
    phone: String
}));

// Input Validation
function validateInput(customer) {
    const schema = {
        name: Joi.string().min(4).max(50).required(),
        phone: Joi.string().min(5).max(10).required(),
        isGold: Joi.boolean().required()
    };
    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validateInput = validateInput;