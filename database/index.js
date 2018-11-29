const mongoose = require('mongoose');
const config = require('../config/config');

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
};

mongoose.Promise = global.Promise;

mongoose.connect(config.db, options)
  .then(() => {
    console.log(`[*] Connected to Database ${config.db}`);
  })
  .catch((err) => {
    console.log(`[*] Error while connecting to DB, with error: ${err}`);
  });

require('./models/user/user');
require('./models/user/user-board-rel');
require('./models/board/board');
require('./models/board/column');
require('./models/board/task');

module.exports = mongoose;
