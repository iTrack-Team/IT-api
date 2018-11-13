const route = require('express').Router();

const authRoute = require('./authentication');

route.use('/auth', authRoute);

module.exports = route;
