const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isAuthenticated } = require('../middlewares/middlewares');

router.get('/login', (req, res) => {
    res.render('loginPage', { isUser: req.isUser });
});

router.get('/register', (req, res) => {
    res.render('registerPage', { isUser: req.isUser });
});

router.post('/register', (req, res) => {
    const { username, password, repeatPassword } = req.body;
    if (username.length < 4 || password.lenght < 4 || repeatPassword !== password) {
        res.redirect('register');
        return;
    }
    logUser(username, password, res)
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username.length < 4 || password.lenght < 4) {
        res.redirect('login');
        return;
    }
    logUser(username, password, res);
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie('userToken')
    res.redirect('/');
});


function logUser(username, password, res) {
    bcrypt.hash(password, 10)
        .then(hashedPass => {
            User.create({
                username,
                password: hashedPass
            })
                .then(user => {
                    console.log(user)
                    const token = jwt.sign({ user }, 'supersecret123');
                    res.cookie('userToken', token);
                    res.redirect('/');
                })
                .catch(err => {
                    res.locals.errors = [err]
                    console.log(err);
                });
        })
        .catch(err => {
            res.locals.errors = [err]
            console.log(err);
        });
}

module.exports = router;