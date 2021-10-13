const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('loginPage');
});

router.get('/register', (req, res) => {
    res.render('registerPage');
});

router.post('/register', (req, res) => {
    const { username, password, repeatPassword } = req.body;
    if (username.length < 4 || password.lenght < 4 || repeatPassword !== password) {
        res.redirect('register');
        return;
    }
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
                    res.render('index');
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;