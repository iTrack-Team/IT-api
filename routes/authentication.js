const route = require('express').Router();
const passport = require('passport');

route.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (user) {
      req.login(user, (error) => {
        if (!error) {
          res.json({
            id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
          });
        } else {
          res.status(400).json(err);
        }
      });
    } else {
      res.status(400).json(err);
    }
  })(req, res, next);
});

route.use('/logout', (req, res) => {
  req.logout();
  res.status(200).end();
});

module.exports = route;
