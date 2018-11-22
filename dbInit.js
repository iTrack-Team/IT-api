const { User } = require('./database/models/user/user');


User.insertMany([
  {
    name: 'Артём',
    surname: 'Германенко',
    email: 'artemgermanenko67@gmail.com',
    salt: '40cdf541008ef8a57c12325671cd4352',
    hash: '727bea6b06f2163d2b0196123e495c2b05e26bd8df08650d50303ad92729856096a6647563998ed3666a4ed6fdda23fead93ea290fd17bb28ce228e16fd46754',
  },
], (err) => {
  if (err) {
    console.log(err);
  }
});
