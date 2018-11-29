const { Board } = require('./database/models/board/board');
const { Column } = require('./database/models/board/column');
const { Task } = require('./database/models/board/task');
const { UserBoardRel } = require('./database/models/user/user-board-rel');

const mongoose = require('mongoose');

const t1 = new mongoose.Types.ObjectId();
const t2 = new mongoose.Types.ObjectId();
const t3 = new mongoose.Types.ObjectId();
const t4 = new mongoose.Types.ObjectId();
const t5 = new mongoose.Types.ObjectId();

Task.insertMany([{
  _id: t1,
  name: 'task1',
  description: 'task1 descr',
},
{
  _id: t2,
  name: 'task2',
  description: 'task2 descr',
},
{
  _id: t3,
  name: 'task3',
  description: 'task3 descr',
},
{
  _id: t4,
  name: 'task4',
  description: 'task4 descr',
},
{
  _id: t5,
  name: 'task5',
  description: 'task5 descr',
}], (err) => {
  if (err) {
    console.log(err);
  }
});

const c1 = new mongoose.Types.ObjectId();
const c2 = new mongoose.Types.ObjectId();

Column.insertMany([{
  _id: c1,
  tasks: [t1, t2, t3],
  name: 'column1',
},
{
  _id: c2,
  tasks: [t4, t5],
  name: 'column2',
}], (err) => {
  if (err) {
    console.log(err);
  }
});

const b1 = new mongoose.Types.ObjectId();

Board.insertMany([{
  _id: b1,
  columns: [c1, c2],
  name: 'Board by Artem',
  description: 'Best board',
}], (err) => {
  if (err) {
    console.log(err);
  }
});

UserBoardRel.insertMany([{
  user: '5bff9888afde310a60140c14',
  board: b1,
}], (err) => {
  if (err) {
    console.log(err);
  }
});
