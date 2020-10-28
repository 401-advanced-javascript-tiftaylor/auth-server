'use strict';

const express = require('express');
const bearerAuth = require('./auth/middleware/bearer-auth.js');
const router = express.Router();


router.get('/secret', bearerAuth, (req, res, next) => {
  res.send('secret')
})


module.exports = router;