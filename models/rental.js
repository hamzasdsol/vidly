const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: String,
            isGold: Boolean,
            phone: String
        })
    },
    movie: {
        type: new mongoose.Schema({
            title : String,
            dailyRentalRate : Number
        })
    },
    dateOut : {
        type: Date,
        required: true,
        default: Date.now
    } ,
    dateReturned : {
        type: Date
    } ,
    rentalFee : {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental){
    const schema = {
        customerId: Joi.objectId().required(),
        movieId : Joi.objectId().required()
    };

    return Joi.validate(rental,schema);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;