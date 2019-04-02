const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/authentication-course', {useNewUrlParser: true});

const SecretSchema = new mongoose.Schema({
    secret: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Secret = mongoose.model('Secret', SecretSchema);

module.exports = Secret;