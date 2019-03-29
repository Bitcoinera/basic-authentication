const User = require('../models/userModel');

module.exports = {
    async saveUser(user) {
        console.log('user to create is', user);
        await User.findOne({username: user.username}, (err, userFound) => {
            if (userFound) {
                console.log('User already exists!');
            } else {
                User.create(user, err => {
                    if (!err) {
                        console.log('User successfully created!');
                    }
                });
            }
        })
    }
}