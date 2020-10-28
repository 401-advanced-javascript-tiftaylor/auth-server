'use strict';

const userCollection = require('../users.collection.model.js');

// if valid and legit user, give access to routehandler, if not error

function bearerAuth(req, res, next) {

  const incomingToken = req.headers.authorization;
  let validToken = '';

  if(incomingToken !== undefined){
     validToken = incomingToken.split(' ')[1]
  }

  return userCollection.validateToken(validToken)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => next(err));
}

module.exports = bearerAuth;