const User = require('../models/userModel');

module.exports = {
    async authUser(user) {
        await User.findOne({username: user.username}, (err, userFound) => {
            if (userFound) {
                if ( userFound.password === user.password ) {
                    console.log('login successfull');
                    return true;
                } else {
                    console.log('passwords to not match');
                    return false;
                }
            } else {
                console.log('User does not exist in database!');
                return false;
            }
        })
    }
}