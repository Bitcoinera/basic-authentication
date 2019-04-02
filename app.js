//jshint esversion:6
require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const userControl = require('./controllers/user');
const authControl = require('./controllers/auth');
const secretControl = require('./controllers/secret');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }

    req.login( user, (err) => {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('secrets');
            })
        }
    })
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    userControl.saveUser(user);
    console.log('redirecting to login');
    res.redirect('login');
})

app.get('/secrets', async (req, res) => {
    if (req.isAuthenticated()) {
        let secretsFound = await secretControl.getSecrets();
        res.render('secrets', {secrets: secretsFound});
    } else {
        res.redirect('login');
    }
})

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
});

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/secrets',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
    // Successful authentication, redirect home.
        res.redirect('/');
});

app.get('/submit', (req, res) => {
    res.render('submit');
})

app.post('/submit', async (req, res) => {
    //Once the user is authenticated and their session gets saved, their user details are saved to req.user.
    console.log('User is in post submit', req.user);

    let secret = {
        secret: req.body.secret,
        user: req.user._id
    }
    secretControl.saveSecret(secret);
    res.redirect('secrets');
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})