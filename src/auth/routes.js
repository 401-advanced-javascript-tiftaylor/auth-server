'use strict';

const express = require('express');
const users = require('./users.collection.model.js');
const basicAuth = require('./middleware/basic-auth.js');
const oauth = require('./middleware/oauth.js');
const router = express.Router();


router.post('/signup', (req,res,next) => {
  const user = req.body;
  users.create(user)
    .then(user => {
      res.send({
        user: user,
        token: users.generateToken(user.username)
      });
    })
    .catch(next)
})

router.post('/signin', basicAuth, (req,res,next) => {
  res.cookie('auth', req.token, {path: '/', secure: true});
  res.header('token', req.token);
  res.send({
    user: req.user,
    token: req.token
  });
})

router.get('/oauth', oauth, (req,res,next) => {
  
    .catch(next);
})

router.get('/users', (req,res,next) => {
  users.read()
    .then(things => {
      res.send({
        results: things,
        count: things.length,
      });
    })
    .catch(next);
})




module.exports = router;