var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');
const  User  = require('../models/User');
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

router.get('/signup', function(req, res, next) {
    res.render("signup");
  });

  router.post("/signup/submit", async (req, res) => {
    const usersCollection = getCollection('users');

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
  });
    try {
      await usersCollection.insertOne(req.body);
      res.redirect('/signin'); 
    } catch(e) {
      res.status(500).send("Failed to save to db.")
    }
    
  });

  module.exports = router;