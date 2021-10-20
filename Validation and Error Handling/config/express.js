const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = (app) => {

    //TODO: Setup the view engine
    app.engine('hbs', handlebars({
        layoutsDir: './views/layouts',
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    //TODO: Setup the body parser
    // app.use(bodyParser.json())
    // app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    //TODO: Setup the static files
    app.use(express.static('static'))
};