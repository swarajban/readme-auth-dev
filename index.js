var jsonwebtoken = require('jsonwebtoken');
var uuid = require('node-uuid');

module.exports = function (projectURL, jwtSecret) {
  return {

    // Return an URL with an authentication token in the query string
    getAuthUrl: function (payload) {
      var jwt = this._getJWT(payload, jwtSecret);
      return projectURL + '?auth_token=' + jwt;
    },

    // Internal function for generating JWTs
    _getJWT: function (payload, secret) {
      var jwtOptions = {
        jwtid: uuid.v4(),
        audience: this.audience
      };
      return jsonwebtoken.sign(payload, secret, jwtOptions);
    },

    // Audience for JWT
    audience: 'readme.io'

  };
};
