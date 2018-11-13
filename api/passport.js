const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');
const bcrypt = require('bcryptjs');

const verifyPassword = (password, user, done) => {
  bcrypt.compare(password, user.hash, (err, res) => {
    if (!res) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
};

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, ((email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Incorrect email.' }); }
    return verifyPassword(password, user, done);
  });
})));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
