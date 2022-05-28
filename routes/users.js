const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const _ = require('lodash');
const {User, validateInput} = require('../models/user');

router.post('/' , async (req,res) => {
    let result = validateInput(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User Already Exists.');

    user = new User(_.pick(req.body, ['name','email','password']));

    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password,salt);

    await user.save();

    const token = user.generateAuthToken();
    res.setHeader("x-auth-token", token).send(_.pick(user, ['_id','name','email']));
});

router.get('/' , async (req,res) => {
    res.send('Get request');
});




module.exports = router;