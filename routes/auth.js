const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require("joi");
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const _ = require('lodash');
const {User} = require('../models/user');

router.post('/' , async (req,res) => {
    let result = validateInput(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
});

router.get('/' , async (req,res) => {
    res.send('Get request');
});


// Input Validation
function validateInput(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(512).required()
    };
    return Joi.validate(req, schema);
}


module.exports = router;