'use strict';

function timeStamp(req, res, next){
  const currentDate = new Date();

  req.requestTime = currentDate.toDateString();
  next();
}

module.exports = timeStamp;