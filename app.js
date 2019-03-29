//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const passport = require('passport');

const userControl = require('./controllers/user');
const authControl = require('./controllers/auth');
const secretControl = require('./controllers/secret');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
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

app.get('/secrets', (req, res) => {
    res.render('secrets');
})

app.get('/submit', (req, res) => {
    res.render('submit');
})

app.post('/submit', (req, res) => {
    let secret = {
        secret: req.body.secret
    }
    secretControl.saveSecret(secret);
})

app.get('/logout', (req, res) => {
    res.render('login');
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})