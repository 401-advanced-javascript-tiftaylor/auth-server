'use strict';

const express = require('express');
const app = express();

const timeStamp = require('./middleware/timestamp.js')
const logger = require('./middleware/logger.js')
const notFound = require('./middleware/404.js')
const serverErr = require('./middleware/500.js')
const router = require('./auth/routes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(timeStamp);
app.use(logger);
app.use(router);
app.use(notFound);
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