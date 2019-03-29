const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/authentication-course', {useNewUrlParser: true});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

const User  = mongoose.model('User', UserSchema)

module.exports = User;