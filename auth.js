const { auth } = require('express-openid-connect');
require('dotenv').config('.env');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'hello, potter.',
  baseURL: 'http://localhost:3000',
  clientID: 'D2eqi4zHhJZgm6lXe7HbDHrK5gaOhD10',
  issuerBaseURL: 'https://dev-r20xhvfyn8f1kdg3.uk.auth0.com'
};

const auth0 = auth(config);

module.exports = auth0;
