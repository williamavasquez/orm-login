module.exports = {
  ensureAuthenticated: function(req, res, next) {
    console.log("Are you logged in? ", req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth/login');
  }
};
