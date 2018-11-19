const nodemailer = require('nodemailer');

const { mailerCredentials } = require('../top-secret');

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'itrackmailer@gmail.com',
    pass: '1q8P9h_7R',
  },
});

module.exports.sendMail = function (to, subject, text) {
  transport.sendMail({
    from: 'itrackmailer@gmail.com',
    to,
    subject,
    text,
  });
};
