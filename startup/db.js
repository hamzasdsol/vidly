const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function (app) {
    //const DB = 'mongodb+srv://vidlyuser:Sdsol99@cluster0.jhslu.mongodb.net/test?retryWrites=true&w=majority'
    const DB = 'mongodb://localhost/vidly'


    mongoose.connect(DB, {
        useCreateIndex: true,
        useFindAndModify: false,
    }).then(() => {
        console.log('Connected to MongoDB');
    });
}