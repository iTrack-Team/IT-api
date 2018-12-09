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
  name: 'После сна:',
  description: 'Нужно почистить зубы, сделать зарядку, застелить кровать.',
},
{
  _id: t2,
  name: 'Еда:',
  description: 'Приготовить себе сытный завтрак, чтобы зарядиться энергией на целый день.',
},
{
  _id: t3,
  name: 'Одежда:',
  description: 'Выбрать оджеду по погоде и погладить её.',
},
{
  _id: t4,
  name: 'Прийти домой:',
  description: 'Закинуть одежду в стирку, поужинать.',
},
{
  _id: t5,
  name: 'Сон:',
  description: 'Умыться, принять душ, лечь спать.',
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
  name: 'Расписание на утро:',
},
{
  _id: c2,
  tasks: [t4, t5],
  name: 'Расписание на вечер:',
}], (err) => {
  if (err) {
    console.log(err);
  }
});

const b1 = new mongoose.Types.ObjectId();

Board.insertMany([{
  _id: b1,
  columns: [c1, c2],
  name: 'Мой день!',
  description: 'Эта доска для расписания моего дня.',
}], (err) => {
  if (err) {
    console.log(err);
  }
});

UserBoardRel.insertMany([{
  user: '5c09241b863a5933f4168fa9',
  board: b1,
}], (err) => {
  if (err) {
    console.log(err);
  }
});
