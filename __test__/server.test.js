const supergoose = require('@code-fellows/supergoose');
const { test, expect } = require('@jest/globals');

const app = require('../src/server.js').app;
const testServer = supergoose(app);

describe('testing express server app', () => {

  test('create user, sign in, get users', async () => {
    process.env.JWT_SECRET = 'asdf';
    const user = {
      "username": "tiffany", 
      "password": "asdf",
      "email": "foo@example.com",
      "fullname": "Tif Taylor"
    };

    const response = await testServer.post('/signup').send(user);
    expect(response.body.user.username).toBe('tiffany');
    expect(response.body.token).toBeTruthy(); 
  })

})