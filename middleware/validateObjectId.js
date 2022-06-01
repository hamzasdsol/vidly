const mongoose = require('mongoose');

module.exports = function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.body.ObjectId)) {
        res.send(404).send('Invalid ID');
    }

    next();

}