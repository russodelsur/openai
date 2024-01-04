const mongoose = require('mongoose');

// Schema for users of app
const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    usage: {
        type: Object,
        required: false,
    },
    refreshToken: [String]
},{
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: true
  });

// let Answers = mongoose.model('user_answers', User);
// Answers.createIndexes();

module.exports = mongoose.model('info', User, "info"); 
