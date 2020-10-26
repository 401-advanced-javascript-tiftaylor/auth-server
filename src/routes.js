'use strict';

const express = require('express');

const router = express.Router();


router.post('/signup', (req,res,next) => {
  const thing = req.body;
  req.model.create(thing)
    .then(thing => {
      res.send(thing);
    })
    .catch(next)
})

router.post('/signin', (req,res,next) => {
  const thing = req.body;
  req.model.create(thing)
    .then(thing => {
      res.send(thing);
    })
    .catch(next)
})

router.get('/users', (req,res,next) => {
  req.model.read()
    .then(things => {
      res.send({
        results: things,
        count: things.length,
      });
    })
    .catch(next);
})



module.exports = router;