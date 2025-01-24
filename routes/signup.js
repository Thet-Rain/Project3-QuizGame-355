var express = require('express');
var router = express.Router();
const  User  = require('../models/User');
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

router.get('/signup', function(req, res, next) {
    res.render("signup");
  });

  router.post("/signup/submit", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
  });

    try {
      //saving user info to data base
      await user.save();
      res.redirect('/signin'); 
    } catch(err) {
      if (err.code === 11000) {
        // 11000 is the MongoDB duplicate key error code
        res.send("Email already exists. Please try a different one.");
      }else{
        res.status(500).send("Failed to save to db.")
      }
    }    
  });

  module.exports = router;