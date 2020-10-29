'use strict';

const userCollection = require('../users.collection.model.js');

// if valid and legit user, give access to routehandler, if not error

async function oauth(req, res, next) {

  let code = req.query.code;
  let token = `https://api.login.yahoo.com/oauth2/get_token`;
  // let remoteUserURL = ``;

  try {
    const access_token = await exchangeCodeForToken(code);
  }

}


async function exchangeCodeForToken(code){
  let tokenReq = await superagent.post(tokenURL);
    .send({
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.redirect_uri,
      response_type: code,
      scope:'openid%20mail-r',
      nonce:'2762b2550b993376c4b7c547fdedaebf3f3cd8ef'
    })

    let access_token = tokenReq.body.access_token;
    return access_token;
}

async function getRemoteUserData(token) {
  console.log('token from code', token);
  let userRequest = await superagent.get(remoteUserURL)
    .set('User-Agent', 'express') // specific to githubs requirement for requesting data
    .set('Authorization', `token ${token}`);

  let user = userRequest.body;

  return user;
}

async function createAPIUser(userdata) {
  const newUser = new Users({ username: userdata.login });
  const savedUser = await newUser.save();

  const token = savedUser.generateToken();

  return token;
}

module.exports = oauth;