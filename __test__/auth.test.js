const basicAuth = require('../src/auth/middleware/basic-auth.js')
const bearerAuth = require('../src/auth/middleware/bearer-auth.js')
const base64 = require('base-64');
const supergoose = require('@code-fellows/supergoose');
const userCollection = require('../src/auth/users.collection.model.js');
const jwt = require('jsonwebtoken');

describe('testing AUTH methods/functions', () => {

  beforeEach(() => {
    process.env.JWT_SECRET = 'asdf';
    const user = {
      "username": "tif", 
      "password": "asdf",
      "email": "foo@example.com",
      "fullname": "Tif Taylor"
    };
    return userCollection.create(user);
  })

  test('valid basic auth credentials', async () => {
    let req = {
      headers: {}
    };
    let res = {};
    let next = (e)=>{console.log(e)};
    const userpass = 'tif:asdf';
    const encode = base64.encode(userpass);
    const header = `Basic ${encode}`;
    req.headers.authorization = header;
    await basicAuth(req, res, next);
    expect(req.user).toBeTruthy();
    expect(req.token).toBeTruthy();
  })

  test('invalid credentials', async () => {
    let req = {
      headers: {}
    };
    let res = {};
    let next = (e)=>{console.log(e)};
    const userpass = 'fit:asdf';
    const encode = base64.encode(userpass);
    const header = `Basic ${encode}`;
    req.headers.authorization = header;
    await basicAuth(req, res, next);
    expect(req.user).toBeFalsy();
    expect(req.token).toBeFalsy();
  })

  test('good token can login', async () => {
    let req = {
      headers: {}
    };
    let res = {};
    let next = (e)=>{console.log(e)};
    const token = userCollection.generateToken('tif')
    const header = `Bearer ${token}`;
    req.headers.authorization = header;
    await bearerAuth(req, res, next);
    expect(req.user).toBeTruthy();
  })

  test('expired token do not allow url use', async () => {
    let req = {
      headers: {}
    };
    let res = {};
    let next = (e)=>{console.log(e)};
    const payload = { 
      username: 'tif',
      iat: 1
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    const header = `Bearer ${token}`;
    req.headers.authorization = header;
    await bearerAuth(req, res, next);
    expect(req.user).toBeFalsy();
  })
})

