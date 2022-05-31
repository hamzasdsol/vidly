const express = require('express');
const app = express();

require('./startup/prod')(app);
require('./startup/routes')(app);
require('./startup/logging')(app);
require('./startup/config')(app);
require('./startup/db')(app);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening ... ' + port)
});