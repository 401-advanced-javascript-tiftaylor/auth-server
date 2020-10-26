'use strict';


function logger(req, res, next){
  console.log(req.requestTime, req.method, req.path)
  next();
}

module.exports = logger;