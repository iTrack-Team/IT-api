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

function updateColumn(columnId, options) {
  return Column.findOneAndUpdate({ _id: columnId }, options);
}


const boardController = {};

boardController.addNewColumn = function (user, nameI) {
  let board = {};
  return UserBoardRel.findOne({ user })
    .populate('board', '-__v')
    .lean()
    .then(data => data.board)
    .then((data) => {
      board = data;
    })
    .then(() => {
      const column = new Column({
        tasks: [],
        name: nameI,
      });
      return column.save();
    })
    .then((column) => {
      board.columns.push(column._id);
      return Board.findByIdAndUpdate(board._id, board);
    })
    .then(() => this.getInfo(user));
};

boardController.addNewTask = function (columnId, name, description, userId) {
  let task;
  const newTask = new Task({
    name,
    description,
  });
  return newTask.save()
    .then((data) => {
      task = data;
    })
    .then(() => getOneColumn(columnId))
    .then((data) => {
      data.tasks.push(task._id);
      return updateColumn(columnId, data);
    })
    .then(() => this.getInfo(userId));
};

boardController.editColumn = function (columnId, name, userId) {
  return Column.findByIdAndUpdate(columnId, {
    name,
  })
    .then(() => this.getInfo(userId));
};

boardController.editTask = function (taskId, name, description, userId) {
  return Task.findByIdAndUpdate(taskId, {
    name,
    description,
  })
    .then(() => this.getInfo(userId));
};

boardController.editBoard = function (userId, name, description) {
  return UserBoardRel.findOne({ user: userId })
    .then(data => Board.findByIdAndUpdate(data.board, {
      name,
    }))
    .then(() => this.getInfo(userId));
};

boardController.deleteTask = function (columnId, taskId, userId) {
  return Task.findByIdAndDelete(taskId)
    .then(() => getOneColumn(columnId))
    .then((data) => {
      const array = [];
      for (let i = 0; i < data.tasks.length; i++) {
        if (data.tasks[i] != taskId) {
          array.push(data.tasks[i]);
        }
      }
      return Column.findOneAndUpdate(columnId, {
        tasks: array,
      });
    })
    .then(() => this.getInfo(userId));
};

boardController.deleteColumn = function (columnId, userId) {
  return Column.findByIdAndDelete(columnId)
    .then(() => UserBoardRel.findOne({ user: userId }, '-__v -_id -user')
      .populate('board', '-__v')
      .then(data => data.board))
    .then((board) => {
      const array = [];
      for (let i = 0; i < board.columns.length; i++) {
        if (board.columns[i] != columnId) {
          array.push(board.columns[i]);
        }
      }
      return Board.findOneAndUpdate(board._id, {
        columns: array,
      });
    })
    .then(() => this.getInfo(userId));
};

boardController.moveTask = function (taskId, columnFrom, columnTo, userId) {
  let task;

  return Column.findOne({
    _id: columnFrom,
  })
    .then((column) => {
      const arr = [];
      for (let i = 0; i < column.tasks.length; i++) {
        if (column.tasks[i] != taskId) {
          arr.push(column.task[i]);
        }
      }
      return Column.findOneAndUpdate({ _id: columnFrom }, {
        tasks: arr,
      });
    })
    .then(() => Column.findOne({ _id: columnTo }))
    .then((column) => {
      column.tasks.push(taskId);
      return Column.findOneAndUpdate({ _id: columnTo }, {
        tasks: column.tasks,
      });
    })
    .then(() => this.getInfo(userId));
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
    .then(() => {
      board.columns = columns;
      return board;
    });
};

module.exports = boardController;
