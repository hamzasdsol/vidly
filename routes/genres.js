const validateObjectId = require('../middleware/validateObjectId');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Genre, validateInput } = require('../models/genre');
const auth = require('../middleware/auth');
require('express-async-errors');

// const middlewareAsync = require('../middleware/async');

// GET REQUEST HANDLER
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort({ name: 1 }).lean();
    res.send(genres);
});

// GET SPECIFIC ID REQUEST HANDLER
router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('ID Not found');
    res.send(genre);
});

// POST REQUEST HANDLER
router.post('/', auth, async (req, res) => {
    const result = validateInput(req.body);
    if (result.error) {
        // Bad Request = 400
        res.status(400).send(result.error.details[0].message);
        return;
    }

    let genre = new Genre({
        name: req.body.name
    });

    genre = await genre.save();
    res.send(genre);
});

// UPDATE REQUEST HANDLER
router.put('/:id', async (req, res) => {
    const result = validateInput(req.body);
    if (result.error) {
        // Bad Request = 400
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send('ID Not found');

    res.send(genre);

});

// DELETE REQUEST HANDLER
router.delete('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('ID Not found');

    res.send('Deleted')
});

module.exports = router;