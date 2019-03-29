const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/authentication-course', {useNewUrlParser: true});

const SecretSchema = new mongoose.Schema({
    secret: String
})

const Secret = mongoose.model('Secret', SecretSchema);

module.exports = Secret;