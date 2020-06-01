const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const { generateHash , validatePasswordHash } = require('../hash');


// POST REQUEST HANDLER
router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) {
        // Bad Request = 400
        res.status(400).send(result.error.details[0].message);
        return;
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    user.password = generateHash(req.body.password);
    user = await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;