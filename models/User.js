const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    scores: [
        {
            score: Number,
            date: { type: Date, default: Date.now },
        },
    ],
});

// Add a unique index to enforce email uniqueness at the database level
// userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);