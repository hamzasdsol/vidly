const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Movie, validateInput } = require('../models/movie');
const {Genre} = require('../models/genre');

// GET REQUEST HANDLER
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

// GET SPECIFIC ID REQUEST HANDLER
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('ID Not found');
    res.send(movie);
});

// POST REQUEST HANDLER
router.post('/', async (req, res) => {
    const result = validateInput(req.body);
    if (result.error) {
        // Bad Request = 400 
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Genre not found');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id : genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();
    res.send(movie);
});

// UPDATE REQUEST HANDLER
router.put('/:id', async (req, res) => {
    const result = validateInput(req.body);
    if(result.error){
        // Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Genre not found');

    let movie = await Movie.findByIdAndUpdate(req.params.id, 
        {
            title: req.body.title,
            genre: {
                _id : genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, {new: true});
    res.send(movie);
});

// DELETE REQUEST HANDLER
router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('ID Not found');
    res.send('Deleted')
});


module.exports = router;