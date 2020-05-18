const Joi = require('joi');
const mongoose = require('mongoose');

// Genre Document Schema
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name : {
        type: String,
        minlength: 5,
        maxlength: 15,
    }
}));

// Input Validation
function validateInput(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

module.exports.Genre = Genre;
module.exports.validateInput = validateInput;