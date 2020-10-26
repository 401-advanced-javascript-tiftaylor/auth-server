'use strict';

const express = require('express');
const app = express();

const timeStamp = require('./middleware/timestamp.js')
const logger = require('./middleware/logger.js')
const serverErr = require('./middleware/500.js')
const router = require('./routes.js');

app.use(express.json());


app.use(timeStamp);
app.use(logger);
app.use(router);
app.use(serverErr);

// start method for server
function start(PORT){
  app.listen(PORT, () => {
    console.log('Server is running');
  });
}

module.exports = {
  start, 
  app
}