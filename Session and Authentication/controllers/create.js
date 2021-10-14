const express = require('express');
const router = express.Router();
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const { isAuthenticated } = require('../middlewares/middlewares');

router.get('/accessory', isAuthenticated, (req, res) => {
    res.render('createAccessory', { isUser: req.isUser });
});

router.post('/accessory', isAuthenticated, (req, res) => {
    const { name, description, imageUrl } = req.body;
    Accessory.create({
        name, description, imageUrl
    })
        .then(accessory => {
            res.redirect('/');
        })
        .catch(err => {
            console.log("Error with accessory creation: ", err);
        });
});

router.get('/', isAuthenticated, (req, res) => {
    res.render('create', { isUser: req.isUser })
});

router.post('/', isAuthenticated, async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body

    Cube.create({
        name, description, imageUrl, difficulty: difficultyLevel
    })
        .then(cube => {
            console.log("Cube created!");
            res.redirect('/')
        })
        .catch(err => {
            console.log("Error with cube creation: ", err);
        });
});

module.exports = router;