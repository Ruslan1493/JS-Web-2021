const express = require('express');
const router = express.Router();
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const searchController = require('./search');
const createController = require('./create');

router.get('/', (req, res) => {
    Cube.find()
        .then(cubes => {
            res.render('index', { layout: false, cube: cubes })
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/attach/accessory/:id', (req, res) => {
    const cubeId = req.params.id;
    Cube.findById(cubeId)
        .then(cube => {
            Accessory
                .find({ '_id': { "$nin": cube.accessories } })
                .then(accessories => {
                    res.render('attachAccessory', { layout: false, cube, accessories });
                })
                .catch(err => {
                    console.log("Error with accessories search: ", err);
                });
        })
        .catch(err => {
            console.log("Error with attach accessory representation: ", err);
        });

});

router.post('/attach/accessory/:id', async(req, res) => {
    const cubeId = req.params.id;
    const accessoryId = req.body.accessory;
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);
    cube.accessories.push(accessory);
    cube.save();
    res.redirect('/');
});

router.get('/about', (req, res) => {
    res.render('about', { layout: false })
});

router.get('/details/:id', (req, res) => {
    const id = req.params.id
    Cube.findById(id)
        .populate('accessories')
        .then(cube => {
            console.log(cube)
            // cube.acce
            res.render('updatedDetailsPage', { layout: false, cube })
        })
        .catch(err => {
            console.log("Error with cube detail representation: ", err);
        });
});

router.use('/create', createController);
router.use('/search', searchController);

router.get('*', (req, res) => {
    res.render('404', { layout: false })
});

module.exports = router;