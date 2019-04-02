const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/userModel');

module.exports = function(passport){

    passport.serializeUser(async function(user, done) {
        if (!user._id) {
            await User.findOne({username: user.username}, (err, userFound) => {
                console.log('userFound is', userFound);
                if (!err) { user = userFound; }
            })
        }
        console.log('USER IS', user)
        done(null, user._id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
        done(err, user);
        });
    });

    // google strategy

    passport.use('google', new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/secrets',
            userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
        },
        function(accessToken, refreshToken, profile, done) {
            console.log('PROFILE IS', profile);
            User.findOrCreate({ username: profile.name.givenName, googleId: profile.id }, function (err, user) {
            return done(err, user);
            });
        }
    ));

    // facebook strategy

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/secrets" 
      },
      function(accessToken, refreshToken, profile, done) {
        console.log('PROFILE IS', profile);
        User.findOrCreate({ username: profile.displayName, facebookId: profile.id }, function (err, user) {
            return done(err, user);
        });
      }
    ));

    // local strategy

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
}