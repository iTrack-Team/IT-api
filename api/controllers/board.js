const { UserBoardRel } = require('../../database/models/user/user-board-rel');
const { Board } = require('../../database/models/board/board');
const { Column } = require('../../database/models/board/column');
const { Task } = require('../../database/models/board/task');

function getTaskById(taskId) {
  return Task.findOne({ _id: taskId }, '-__v')
    .lean();
}

function getTasks(columns) {
  return Promise.all(columns.map((column) => {
    column.tasks = Promise.all(column.tasks.map(task => getTaskById(task)));
    return column;
  }));
}

function getColumns(arr) {
  return Promise.all(arr.map(el => Column.findOne({ _id: el }, '-__v')));
}

const boardController = {};

boardController.create = function (options) {
  const board = new Board(options);
  return board.save();
};


boardController.getInfo = function (userId) {
  let board = {};
  return UserBoardRel.findOne({ user: userId }, '-__v -_id -user')
    .populate('board', '-__v')
    .then(data => data.board)
    .then((data) => {
      board = data;
      return data;
    })
    .then(data => getColumns(data.columns))
    .then((data) => {
      board.columns = data;
    })
    .then(() => getTasks(board.columns))
    .then((data) => {
      board.columns = data;
    })
    .then(() => board);
};

module.exports = boardController;
