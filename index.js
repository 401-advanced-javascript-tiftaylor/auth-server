
'use strict';

require('dotenv').config()
const mongoose = require('mongoose');

const server = require('./lib/server.js');
const PORT = process.env.PORT || 3003;


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  findAndModify: false,
  returnOriginal: false,
}).then(() => {
  server.start(PORT);
}).catch((error) => {
  console.error(error);
  mongoose.disconnect();
})



