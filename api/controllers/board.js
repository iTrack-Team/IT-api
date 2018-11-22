const { UserBoardRel } = require('../../database/models/user/user-board-relation');
const { Board } = require('../../database/models/board/board');

const boardController = {};

boardController.create = function (options) {
  const board = new Board(options);
  return board.save();
};

boardController.getBoardsByUserId = function (userId) {
  return UserBoardRel.find({ user: userId }, 'board')
    .populate('board', 'name _id')
    .lean()
    .then(boards => boards.map(el => el.board));
};

boardController.getInfo = function (boardId) {
  return Board.findOne({ _id: boardId }, '-__v')
    .populate('columns')
    .lean();
};

module.exports = boardController;
