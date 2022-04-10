const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: {type: String, required: true},
    emailId: {type: String, required: true},
    password: {type: String, required: true},
    phonenumber: String,
    profilePicture: String,
    gender: String,
    city: String,
    country: String,
    dateofbirth: Date,
    address: String,
    about: String
});

const userModel = mongoose.model('user', usersSchema);
module.exports = userModel;