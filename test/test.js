var assert = require('assert');
var jsonwebtoken = require('jsonwebtoken');

var ReadMeAuth = require('../index');

describe('ReadMe Auth', function () {

  var TestAuth;
  var JWT_SECRET = 'jwts3cr3t';
  var READ_ME_PROJECT_URL = 'readme-auth.readme.io';

  var TEST_PAYLOAD = {
    name: 'Owlbert',
    email: 'owlbert@readme.io'
  };

  // Initialize a ReadMeAuth client
  before(function () {
    TestAuth = new ReadMeAuth(READ_ME_PROJECT_URL, JWT_SECRET);
  });

  // Test generating a valid JWT with given payload & secret
  describe('_getJWT', function () {
    it('should return a valid JWT when given a payload', function (done) {
      var token = ReadMeAuth._getJWT(TEST_PAYLOAD, JWT_SECRET);
      jsonwebtoken.verify(token, JWT_SECRET, { audience: TestAuth.audience },
        function (err, decoded) {
          assert.ifError(err);
          assert.ok(decoded);
          assert.ok(decoded.jti);
          assert.equal(TEST_PAYLOAD.name, decoded.name);
          assert.equal(TEST_PAYLOAD.email, decoded.email);
          done();
        }
      );
    });
  });

  // Test getting full auth URL using this readme-auth module
  describe('getAuthUrl', function () {
    it('should return an url with a valid JWT as a query param', function (done) {
      var url = TestAuth.getAuthUrl(TEST_PAYLOAD);
      var parts = url.split('?');
      assert.equal(2, parts.length);
      var projectURL = parts[0];
      assert.equal(READ_ME_PROJECT_URL, projectURL);
      var queryParams = parts[1];
      assert.equal(READ_ME_PROJECT_URL, parts[0]);
      var queryParts = queryParams.split('=');
      var queryKey = queryParts[0];
      var queryToken = queryParts[1];
      assert.equal('auth_token', queryKey);

      jsonwebtoken.verify(queryToken, JWT_SECRET,
        function (err) {
          assert.ifError(err);
          done();
        }
      );
    });

  });

});
