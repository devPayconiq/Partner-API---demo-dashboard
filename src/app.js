const express = require('express');
const bodyParser = require('body-parser');

const registerWebApp = require('./web-app');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
const app = express();
app.use(bodyParser());
app.use(bodyParser.json());

registerWebApp(app);

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send({"Error": err.stack});
});

module.exports = app;