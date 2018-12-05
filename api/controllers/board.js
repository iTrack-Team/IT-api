const { UserBoardRel } = require('../../database/models/user/user-board-rel');
const { Board } = require('../../database/models/board/board');
const { Column } = require('../../database/models/board/column');
const { Task } = require('../../database/models/board/task');

function getTaskById(taskId) {
  return Task.findOne({ _id: taskId }, '-__v')
    .lean();
}

function getTasks(taskArray) {
  return Promise.all(taskArray.map(el => getTaskById(el)));
}

function getOneColumn(id) {
  return Column.findOne({ _id: id }, '-__v')
    .lean();
}

function getColumns(arr) {
  return Promise.all(arr.map(el => getOneColumn(el)));
}

const boardController = {};

boardController.create = function (options) {
  const board = new Board(options);
  return board.save();
};


boardController.getInfo = function (userId) {
  const board = {};
  let columns;

  return UserBoardRel.findOne({ user: userId }, '-__v -_id -user')
    .populate('board', '-__v')
    .then(data => data.board)
    .then((data) => {
      board.name = data.name;
      board.description = data.description;
      board._id = data._id;
      return data;
    })
    .then(data => getColumns(data.columns))
    .then((data) => {
      columns = data;
    })
    .then(() => Promise.all(columns.map(el => getTasks(el.tasks)
      .then((data) => {
        el.tasks = data;
        return el;
      }))))
    .then((data) => {
      board.columns = columns;
      return board;
    });
};

module.exports = boardController;
