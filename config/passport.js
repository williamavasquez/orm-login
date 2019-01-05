const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/usersModels');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      console.log(username)

      // Match user
      User.findOne(['username',username],user => {
        console.log(user)
        if (user.length === 0) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user[0].password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user[0]);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    console.log("serializeUser")
    console.log(user)
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findOne(['id',id], function(err, user) {
      done(err, user);
    });
  });
};
