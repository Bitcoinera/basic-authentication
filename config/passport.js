const LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel');

module.exports = function(passport) {
// passport session setup. serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.password);
});

// used to deserialize the user
passport.deserializeUser(function(user, done) {
    User.findOne(user.username, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy( // 'local' is the default strategy name in Passport.js
// Otherwise we would write: passport.use('local-signup', new LocalStrategy())
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
                if (!user) {
                    return done( null, false, { message: 'Incorrect username.' } );
            }
            if ( user.password !== password ) {
                return done( null, false, { message: 'Incorrect password.' } );
            }
            return done( null, user );
        });
    }
 ));

};