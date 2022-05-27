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

const DB = 'mongodb+srv://vidlyuser:Sdsol99!@cluster0.jhslu.mongodb.net/test?retryWrites=true&w=majority'


mongoose.connect(DB, {
    usedNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.log('Something went wrong' + err);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening ... ' + port)
});