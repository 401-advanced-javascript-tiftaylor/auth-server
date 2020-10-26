'use strict';

function serverErr(err, req, res, next){
  console.error(err.stack)
  res.status(500).send('500 Server Error!');
}

module.exports = serverErr;