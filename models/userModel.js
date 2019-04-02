const findOrCreate = require('mongoose-findorcreate');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/authentication-course', {useNewUrlParser: true});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
    facebookId: String
})

UserSchema.plugin(findOrCreate)

const User  = mongoose.model('User', UserSchema)

module.exports = User;