var jsonwebtoken = require('jsonwebtoken');
var uuid = require('node-uuid');

var ReadMeAuth = function (projectURL, jwtSecret) {
  this.projectUrl = projectURL || process.env['README_PROJECT_URL'];
  this.jwtSecret = jwtSecret || process.env['README_PROJECT_SECRET'];
};

// Return an URL with an authentication token in the query string
ReadMeAuth.prototype.getAuthUrl = function (payload) {
  var jwt = ReadMeAuth._getJWT(payload, this.jwtSecret);
  return this.projectUrl + '?auth_token=' + jwt;
};

// Internal function for generating JWTs
ReadMeAuth._getJWT = function (payload, secret) {
  var jwtOptions = {
    jwtid: uuid.v4(),
    audience: this.audience
  };
  return jsonwebtoken.sign(payload, secret, jwtOptions);
};

// Audience for JWT
ReadMeAuth.audience = 'readme.io';


module.exports = ReadMeAuth;
