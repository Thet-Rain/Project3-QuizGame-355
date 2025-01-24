var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');

router.get('/signup', function(req, res, next) {
    res.render("signup");
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

  module.exports = router;