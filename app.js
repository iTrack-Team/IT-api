const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const passport = require('passport');
const middlewares = require('./api/middlewares');
const config = require('./config/config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(expressSession({
  store: new MongoStore({
    url: config.sessionUrl,
  }),
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
}));
app.use(passport.initialize());
app.use(passport.session());

require('./database');
require('./api/passport');

app.use(middlewares.cors);

app.use(require('./routes'));

//require('./dbInit');

const server = app.listen(config.port, () => {
  console.log(`[*] Server on port ${server.address().port}`);
});
