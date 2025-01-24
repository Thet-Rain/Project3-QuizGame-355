var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');

router.get('/signin', function(req, res, next) {
    res.render("signin");
  });

;

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

module.exports = router;