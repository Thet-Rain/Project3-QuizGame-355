var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');

//Protected Route
router.get('/', checkLoggedIn , function(req, res, next) {
  // Access session data
  res.locals.user_name = req.session.user;
  res.render("dashboard", {user_name: res.locals.user_name} );
  
});

router.get('/signin', function(req, res, next) {
  res.render("signin");
});

router.get('/signup', function(req, res, next) {
  res.render("signup");
});

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

router.post("/signup/submit", async (req, res) => {
  const usersCollection = getCollection('users');
  try {
    await usersCollection.insertOne(req.body);
    res.redirect('/signin'); 
  } catch(e) {
    res.status(500).send("Failed to save to db.")
  }
  
});

router.post("/signin/submit", async (req, res) => {
  const usersCollection = getCollection('users');
  try {
    // check if the user exists
    const user = await usersCollection.findOne({ email: req.body.email });
    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        req.session.loggedIn = true;
        req.session.user = user.name;
        res.redirect("/");
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
  
});

function checkLoggedIn(req, res, next) {
  if (req.session.loggedIn)
    next();
  else
    res.redirect('/signin')
}

module.exports = router;
