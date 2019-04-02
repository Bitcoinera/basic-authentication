const findOrCreate = require('mongoose-findorcreate');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/authentication-course', {useNewUrlParser: true});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    googleId: String,
    facebookId: String,
    secrets: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Secret',
          }]
    }
})

UserSchema.plugin(findOrCreate)

const User  = mongoose.model('User', UserSchema)

module.exports = User;