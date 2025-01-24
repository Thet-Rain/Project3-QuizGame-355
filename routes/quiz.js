var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");
const  User  = require('../models/User');
const mongoose = require("mongoose");
const session = require('express-session');

router.get('/quiz', checkLoggedIn , async function(req, res, next) {
  
    // Access session data
    res.locals.user_name = req.session.user;
    res.locals.user_email = req.session.email;
    res.render("quiz");
    
  });
  
  //check user session if loged in or not
  function checkLoggedIn(req, res, next) {
    if (req.session.loggedIn)
      next();
    else
      res.redirect('/signin')
  }

//MIDDLE WARE FOR QUIZROUTER
// Helper function to read the leaderboard JSON file
const getLeaderboard = () => {
const filePath = path.join(__dirname, "../data/leaderboard.json");
const data = fs.readFileSync(filePath, "utf-8");
return JSON.parse(data);
};
  
// Helper function to save the leaderboard JSON file
const saveLeaderboard = (leaderboard) => {
const filePath = path.join(__dirname, "../data/leaderboard.json");
fs.writeFileSync(filePath, JSON.stringify(leaderboard, null, 2), "utf-8");
};

// In-memory score storage and Leader board(reset when server restarts)
let score = 0;
const leaderboard = [];

// Route to update score counter
router.post("/updateScore", (req, res) => {
    
    const isCorrect  = req.body.booleanVar; // Expecting JSON payload
  
    if (isCorrect) {
      score += 1; // Increment score if the answer is correct
      res.json({ correct: true, score });
    } else {
      res.json({ correct: false, score });
    }
  });

  // Route to get the current score
  router.get("/score", (req, res) => {
    res.json({ score });
  });
  
  // **Route to reset the score**
  router.post("/reset", (req, res) => {
      score = 0; // Reset the score to 0
      res.json({ message: "Score has been reset.", score });
    });
  
  // Route to get the leaderboard
  router.get("/leaderboard", (req, res) => {
  const leaderboard = getLeaderboard();
  res.json(leaderboard);
  });
    
  // Route to add a new entry to the leaderboard
  router.post("/leaderboard", async (req, res) => {
  const { name } = req.body;
    
  if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "Invalid name provided." });
  }
    
  const leaderboard = getLeaderboard();
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score); // Sort by score descending
  leaderboard.splice(10); // Keep only the top 10
    
  saveLeaderboard(leaderboard);

  //Also include adding user score to user profile database
  // Save the score to the user's profile
  const user = await User.findOne({email : req.session.email});
  user.scores.push({ score });
  await user.save();
    
  res.json({ message: "Leaderboard updated.", leaderboard });
  });

  

  module.exports = router;