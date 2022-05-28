const express = require('express');
const morgan = require('morgan');
const config = require('config');
const mongoose = require('mongoose');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

require('./startup/prod')(app)
app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR : jwtPrivateKey is not defined.')
    process.exit(1);
}

//const DB = 'mongodb+srv://vidlyuser:Sdsol99@cluster0.jhslu.mongodb.net/test?retryWrites=true&w=majority'
const DB = 'mongodb://localhost/vidly'


mongoose.connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.log('Something went wrong' + err);
    });

const port = process.env.PORT || 5500;
app.listen(port, () => {
    console.log('Listening ... ' + port)
});

// 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 PAT