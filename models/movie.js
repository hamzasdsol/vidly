const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

// Movie Document Schema
const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: String,
    genre : genreSchema,
    numberInStock : Number,
    dailyRentalRate : Number
}));

// Input Validation
function validateInput(movie) {
    const schema = {
        title: Joi.string().min(4).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.validateInput = validateInput;