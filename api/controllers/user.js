const generatePassword = require('password-generator');
const mailer = require('../mailer');
const { User } = require('../../database/models/user/user');

const userController = {};

userController.addUser = function (userData) {
  const newUser = new User(userData);
  const password = generatePassword(8, false);
  newUser.setPassword(password);
  return newUser
    .save()
    .then(() => {
      mailer.sendMail(
        userData.email,
        'Добро пожаловать на портал ITRACK',
        `Вы были успешно зарегистрированы на портале ITRACK.\nВаши данные для входа:\n
        \tЛогин: ${userData.email}\n
        \tПароль: ${password}`,
      );
    });
};

module.exports = userController;
