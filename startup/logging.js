const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function (app) {
    process.on('uncaughtException', (ex) => {
        winston.error(ex.message, ex);
        process.exit(1);
    });

    process.on('unhandledRejection', (ex) => {
        winston.error(ex.message, ex);
        process.exit(1);
    });


    winston.add(new winston.transports.File({ filename: 'error.log' }));
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly' }));
}