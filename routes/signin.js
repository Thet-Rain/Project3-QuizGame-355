var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

router.get('/signin', function(req, res, next) {
    res.render("signin");
  });

;

router.post("/signin/submit", async (req, res) => {
  const usersCollection = getCollection('users');
  try {
    const { email, password } = req.body;
    // check if the user exists
    const user = await usersCollection.findOne({ email });
    // console.log(user);
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