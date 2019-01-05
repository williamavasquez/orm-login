const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const passport = require("passport")

const User = require("../models/usersModels")

router.get('/login', (req, res)=>{
  res.render("loginForm")
})

router.get('/new-account', (req, res)=>{
  res.render("registerForm")
})

//Creating a new account
router.post('/turtles', (req, res) => {
  const { name, username, password } = req.body;

    User.findOne( ["username", username], dbResult => {
      if (dbResult.length > 0) {
        res.render('userExist')
      } else{
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            User.createUser(
              [name,username,hash],
            newUser => {
                res.redirect('/auth/login');
              })
          });
        });
      }
    });
  });

router.post('/login', (req, res, next) => {
  console.log(req.body)
  console.log("Post Login Route")
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login'
  })(req, res, next);
});


router.get('/logout', (req, res) => {
  console.log("Boom Logged out!!")
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});


module.exports = router