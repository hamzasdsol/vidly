const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies' , movies);
app.use('/api/rentals' , rentals);
app.use('/api/users', users);

mongoose.connect('mongodb://localhost/vidly')
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Something went wrong' + err);
});

const port = process.env.PORT || 3000;
app.listen(port , () => {
    console.log('Listening ... ' + port)
});