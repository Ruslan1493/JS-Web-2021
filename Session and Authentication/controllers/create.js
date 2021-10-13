const express = require('express');
const router = express.Router();
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

router.get('/accessory', (req, res) => {
    res.render('createAccessory');
});

router.post('/accessory', (req, res) => {
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

router.get('/', (req, res) => {
    res.render('create')
});

router.post('/', async (req, res) => {
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