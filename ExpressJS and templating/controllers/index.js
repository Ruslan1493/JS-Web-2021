const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../config/database.json'), 'utf8', (err, data) => {
        if (err) {
            console.log('Reading database error: ', err)
        }
        data = JSON.parse(data)
        res.render('index', { layout: false, cube: data })
    })
});

router.get('/about', (req, res) => {
    res.render('about', { layout: false })
});

router.get('/create', (req, res) => {
    res.render('create', { layout: false })
});

router.post('/create', (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body

    const formData = {
        name, description, imageUrl, difficultyLevel
    }
    fs.readFile(path.join(__dirname, '../config/database.json'), 'utf8', (err, data) => {
        let array = JSON.parse(data)
        if (array.length === 0) {
            formData.id = 1
        } else {
            console.log(array[array.length - 1].id)
            let id = array[array.length - 1].id + 1
            formData.id = id
        }

        array.push(formData)
        fs.writeFile(path.join(__dirname, '../config/database.json'), JSON.stringify(array), (err, data) => {
            if (err) {
                console.log('Error with data writing', err)
                return
            }
        })
    });
    res.redirect('/')
});

router.get('/about', (req, res) => {
    res.render('about', { layout: false })
});

router.get('/details/:id', (req, res) => {
    const id = req.params.id
    fs.readFile(path.join(__dirname, '../config/database.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        data = JSON.parse(data)
        const cube = data.filter(cube => cube.id == id)[0]
        res.render('details', { layout: false, cube: cube })
    })
});

router.post('/search', (req, res) => {
    const { search, from, to } = req.body
    fs.readFile(path.join(__dirname, '../config/database.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        data = JSON.parse(data)
        const cubes = data.filter(cube => {
            return cube.name.includes(search) &&
                ((to !== '') ? Number(cube.difficultyLevel) <= Number(to) : Number(cube.difficultyLevel) >= 1) &&
                ((from !== '') ? Number(cube.difficultyLevel) >= Number(from) : Number(cube.difficultyLevel <= 6))
        })
        res.render('index', { layout: false, cube: cubes })
    })
});

router.get('*', (req, res) => {
    res.render('404', { layout: false })
});

module.exports = router;