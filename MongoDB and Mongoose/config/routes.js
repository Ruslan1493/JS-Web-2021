// TODO: Require Controllers...
const express = require('express');
const router = express.Router();
const controller = require('./../controllers/index')

module.exports = (app) => {
    // TODO...
    app.use('/', controller)
};