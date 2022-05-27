const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
require('./startup/prod')(app)
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

mongoose.connect('mongodb://localhost/vidly')
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.log('Something went wrong' + err);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening ... ' + port)
});