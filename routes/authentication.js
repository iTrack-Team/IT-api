const route = require('express').Router();
const passport = require('passport');
const userController = require('../api/controllers/user');
const response = require('./response');

route.use('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (user) {
      req.login(user, error => (error
        ? res.status(400).end()
        : res.json({
          id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
        })));
    } else {
      return res.status(400).json(err);
    }
  })(req, res, next);
});

route.use('/logout', (req, res) => {
  req.logout();
  res.status(200).end();
});

route.post('/register', (req, res) => {
  userController.addUser({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
  })
    .then(() => response(res, ''))
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.post('/reset-password', (req, res) => {
  userController
    .resetPassword(req.body.email)
    .then(() => response(res, {}))
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = route;
