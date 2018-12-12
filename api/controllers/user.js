const generatePassword = require('password-generator');
const mailer = require('../mailer');
const { User } = require('../../database/models/user/user');
const { Board } = require('../../database/models/board/board');
const { Column } = require('../../database/models/board/column');
const { UserBoardRel } = require('../../database/models/user/user-board-rel');
const mongoose = require('mongoose');

const userController = {};

userController.addUser = function (userData) {
  const newUser = new User(userData);
  const password = generatePassword(8, false);
  let userId;
  newUser.setPassword(password);
  return newUser
    .save()
    .then((user) => {
      userId = user._id;
      mailer.sendMail(
        userData.email,
        'Добро пожаловать на портал ITRACK',
        `Вы были успешно зарегистрированы на портале ITRACK.\nВаши данные для входа:\n
        \tЛогин: ${userData.email}\n
        \tПароль: ${password}`,
      );
    })
    .then(() => {
      const columnId = new mongoose.Types.ObjectId();
      const column = new Column({
        _id: columnId,
        name: 'To do',
        tasks: [],
      });
      return column.save();
    })
    .then((column) => {
      const boardId = new mongoose.Types.ObjectId();
      const arr = [];
      arr.push(column._id);
      const board = new Board({
        _id: boardId,
        name: 'Hi',
        columns: arr,
      });
      return board.save();
    })
    .then((board) => {
      const rel = new UserBoardRel({
        board: board._id,
        user: userId,
      });
      return rel.save();
    });
};

userController.changePassword = function (userId, oldPass, newPass) {
  return User
    .findById(userId)
    .then((user) => {
      if (user.verifyPassword(oldPass)) {
        return user;
      }
      throw new Error();
    })
    .then((user) => {
      const { email } = user;
      mailer.sendMail(
        email,
        'Смена пароля',
        'Здравствуйте, ваш пароль был успешно изменен.',
      );
      user.setPassword(newPass);
      user.markModified('hash');
      user.markModified('salt');
      return user.save();
    });
};

userController.resetPassword = function (mail) {
  return User
    .findOne({ email: mail })
    .then((user) => {
      if (user) {
        const password = generatePassword(8, false);
        mailer.sendMail(
          mail,
          'Сброс пароля',
          `Здравствуйте, на вашем аккаунте была задействована функция сброса пароля.\nНовый пароль: ${password}`,
        );
        user.setPassword(password);
        user.markModified('hash');
        user.markModified('salt');
        user.save();
      }
    });
};

module.exports = userController;
