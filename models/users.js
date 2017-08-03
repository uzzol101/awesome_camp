var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // check for username is unique
    username: { type: String, required: true, unique: true },
    // check for email is unique
    email: { type: String, unique: true },
    password: { type: String, required: true }
});


var User = mongoose.model("User", userSchema);

module.exports = User;