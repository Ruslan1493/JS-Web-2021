const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const searchController = require('./search');
const createController = require('./create');
const userController = require('./user');
const User = require('../models/User');
const { isAuthenticated } = require('../middlewares/middlewares');

router.use(async (req, res, next) => {
    const userToken = req.cookies['userToken'];
    let user = null;
    let isUser = false;
    if (userToken) {
        const decodedToken = jwt.verify(userToken, 'supersecret123');
        user = await User.findById(decodedToken.user._id);
    };
    if (user !== null) {
        isUser = true;
        req.isUser = isUser;
    }
    next();
});

router.get('/', (req, res) => {
    Cube.find()
        .then(cubes => {
            res.render('index', { cube: cubes, isUser: req.isUser })
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/attach/accessory/:id', isAuthenticated, (req, res) => {
    const cubeId = req.params.id;
    Cube.findById(cubeId)
        .then(cube => {
            Accessory
                .find({ '_id': { "$nin": cube.accessories } })
                .then(accessories => {
                    res.render('attachAccessory', { cube, accessories, isUser: req.isUser });
                })
                .catch(err => {
                    console.log("Error with accessories search: ", err);
                });
        })
        .catch(err => {
            console.log("Error with attach accessory representation: ", err);
        });

});

router.post('/attach/accessory/:id', isAuthenticated, async (req, res) => {
    const cubeId = req.params.id;
    const accessoryId = req.body.accessory;
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);
    cube.accessories.push(accessory);
    cube.save();
    res.redirect('/');
});

router.get('/about', (req, res) => {
    res.render('about', { isUser: req.isUser })
});

router.get('/details/:id', (req, res) => {
    const id = req.params.id
    Cube.findById(id)
        .populate('accessories')
        .then(cube => {
            console.log(cube)
            // cube.acce
            res.render('updatedDetailsPage', { cube, isUser: req.isUser })
        })
        .catch(err => {
            console.log("Error with cube detail representation: ", err);
        });
});

router.use('/create', createController);
router.use('/search', searchController);
router.use('/user', userController);

router.get('*', (req, res) => {
    res.render('404')
});

module.exports = router;