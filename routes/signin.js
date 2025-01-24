var express = require('express');
var router = express.Router();
const  User  = require('../models/User');
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

router.get('/signin', function(req, res, next) {
    res.render("signin");
  });

;

router.post("/signin/submit", async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if the user exists
    const user = await User.findOne({ email });

    //compare passwrod
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.loggedIn = true;
      req.session.user = user.name;
      req.session.email = user.email;
      res.redirect("/");
    } else {
      res.status(400).json({ error: "User doesn't exist or Password Doesn't Match" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
  
});

module.exports = router;