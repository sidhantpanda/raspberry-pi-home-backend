const passport = require('passport');
const AuthTokenStrategy = require('passport-auth-token');
const AccessToken = require('../models/AccessToken');
const User = require('../models/User');

passport.use('authtoken', new AuthTokenStrategy(
  function (token, done) {
    AccessToken.findOne({
      token: token
    }, function (error, accessToken) {
      if (error) {
        return done(error);
      }

      if (accessToken) {
        if (!token.isValid(accessToken)) {
          return done(null, false);
        }

        User.findOne({
          id: accessToken.userId
        }, function (error, user) {
          if (error) {
            return done(error);
          }

          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        });
      } else {
        return done(null);
      }
    });
  }
));

module.exports = passport;