const route = require('express').Router();

const authRoute = require('./authentication');
const boardRoute = require('./board');

route.use('/auth', authRoute);

route.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send();
  }
});

route.use('/board', boardRoute);

module.exports = route;
