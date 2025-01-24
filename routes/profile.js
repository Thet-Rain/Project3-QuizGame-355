var express = require('express');
var router = express.Router();
const  User  = require('../models/User');


// Profile Page
router.get('/profile', async (req, res) => {
    res.locals.user_name = req.session.user;
    res.locals.user_email = req.session.email;
    try {
        // Check if the user is logged in
        if (!req.session.user) {
            return res.redirect("/login");
        }

        // Find the user in the database
        const user = await User.findOne({email : req.session.email});

        // Render the profile page with user data
        res.render("profile", { user });
    } catch (err) {
        console.error("Error fetching user profile:", err);
        res.status(500).send("An error occurred while loading your profile.");
    }
});

module.exports = router;