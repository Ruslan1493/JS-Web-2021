const express = require('express');
const router = express.Router();
const Cube = require('../models/Cube');

router.post('/', (req, res) => {
    const { search, from, to } = req.body

    Cube
        .find({})
        .then(cubes => {
            cubes = cubes.filter(cube => {
                return cube.name.includes(search) &&
                    ((to !== '') ? Number(cube.difficulty) <= Number(to) : Number(cube.difficulty) >= 1) &&
                    ((from !== '') ? Number(cube.difficulty) >= Number(from) : Number(cube.difficulty <= 6))
            })
            res.render('index', { layout: false, cube: cubes });
        })
        .catch(err => {
            console.log("Error with cubes filter: ", err);
        });
});

module.exports = router;