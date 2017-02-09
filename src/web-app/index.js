const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const config = require('config');

const mainController = require('../web-app/controllers/main');
const partnerController = require('../web-app/controllers/partner');
const clientController = require('../web-app/controllers/client');
const transactionController = require('../web-app/controllers/transaction');

const partnerId = config.get('partnerId');
const partnerKey = config.get('partnerKey');

function registerWith(app) {
    setUpTemplates(app);
    registerControllers(app);

    const staticFiles = path.join(__dirname, 'static');
    app.use('/static', express.static(staticFiles));
}

function registerControllers(app) {
    mainController(app);
    clientController(app);
    partnerController(app);
    transactionController(app);
}

function setUpTemplates(app) {
    const hbs = exphbs.create({
        defaultLayout: 'main',
        helpers: {
            stringifyJSON: function (object) {
                return JSON.stringify(object);
            }
        }
    });

    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
}

module.exports = registerWith;