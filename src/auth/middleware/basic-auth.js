'use strict';
const base64 = require('base-64');
const userCollection = require('../users.collection.model.js');


function basicAuth(req, res, next) {

  const header = req.headers.authorization;
  const decodedString = base64.decode(header.split(' ')[1]);
  const [user, pass] = decodedString.split(':');

  return userCollection.authenticate(user, pass)
    .then(user => {
      req.token = userCollection.generateToken(user.username);
      req.user = user;
      next();
    })
    .catch(err => next(err));
}

module.exports = basicAuth;