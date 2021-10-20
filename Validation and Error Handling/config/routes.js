// TODO: Require Controllers...
const express = require('express');
const router = express.Router();
const controller = require('./../controllers/index')
const { defaultError } = require('../middlewares/errorHandlerMiddleware'); 

module.exports = (app) => {
    // TODO...
    app.use('/', controller),
    app.use(defaultError)
};