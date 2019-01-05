//Modules installed
const express = require('express')
const exphbs = require("express-handlebars")
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

//Files imported
const routes = require("./controller/router")
const authRoutes = require("./controller/auth")

const app = express()

// Passport Config
require('./config/passport')(passport);

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//routes
app.use('/',routes);
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server Listening on PORT ${PORT}`))