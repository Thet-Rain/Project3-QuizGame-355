var express = require('express');
var router = express.Router();

router.get('/quiz', checkLoggedIn , async function(req, res, next) {
  
    // Access session data
    res.locals.user_name = req.session.user;
    res.render("quiz", {  user_name: res.locals.user_name });
    
  });
  
  
  
  //check user session if loged in or not
  function checkLoggedIn(req, res, next) {
    if (req.session.loggedIn)
      next();
    else
      res.redirect('/signin')
  }

  module.exports = router;