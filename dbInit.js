const bcrypt = require('bcryptjs');

const { User } = require('./database/models/user/user');

function genPass(pass) {
  return bcrypt.hashSync(pass, 10);
}

User.insertMany([
  {
    name: 'Артём',
    surname: 'Германенко',
    email: 'artemgermanenko67@gmail.com',
    hash: genPass('12345a'),
  },
], (err) => {
  if (err) {
    console.log(err);
  }
});
