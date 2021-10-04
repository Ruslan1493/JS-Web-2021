const express = require('express');
const router = express.Router();
const index = require('./../views/index.hbs')

router.get('/', (req, res) => {
    res.render('about', {layout: false})
})

module.exports = router;