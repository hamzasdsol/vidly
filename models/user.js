const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id} , config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model("User",userSchema);

// Input Validation
function validateInput(user) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(512).required()
    };
    return Joi.validate(user, schema);
}


module.exports.User = User;
module.exports.validateInput = validateInput;