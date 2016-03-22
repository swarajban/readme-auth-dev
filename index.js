var jsonwebtoken = require('jsonwebtoken');
var uuid = require('node-uuid');

exports.default = function (readmeURL, jwtSecret) {
  return {
    getAuthUrl: function (payload) {
      var jwtOptions = {
        jwtid: uuid.v4()
      };
      var jwt = jsonwebtoken.sign(payload, jwtSecret, jwtOptions);
      return readmeURL + '?auth_token=' + jwt;
    }
  };
};
