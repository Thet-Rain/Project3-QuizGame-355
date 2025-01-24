var express = require('express');
var router = express.Router();


//Protected Routes
router.get('/', checkLoggedIn , function(req, res, next) {
  // Access session data
  res.locals.user_name = req.session.user;
  res.render("dashboard", {user_name: res.locals.user_name} );
  
});



//check user session if loged in or not
function checkLoggedIn(req, res, next) {
  if (req.session.loggedIn)
    next();
  else
    res.redirect('/signin')
}

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error logging out');
    } else {
      // Clear the cookie on the client side
      res.clearCookie('connect.sid'); // Replace 'connect.sid' with your cookie name if different
      res.redirect('/'); // Redirect to the home page or login page
    }
  });
});



module.exports = router;
