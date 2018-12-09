const route = require('express').Router();
const Board = require('../api/controllers/board');
const response = require('./response');

route.get('/info', (req, res) => {
  Board.getInfo(req.user._id)
    .then(data => response(res, false, data))
    .catch(err => response(res, err));
});

route.post('/add-column', (req, res) => {
  Board.addNewColumn(req.user._id, req.body.name)
    .then(data => response(res, false, data))
    .catch(err => response(res, err));
});

route.post('/add-task/:columnId', (req, res) => {
  Board.addNewTask(req.params.columnId, req.body.name, req.body.description, req.user._id)
    .then(data => response(res, false, data))
    .catch(err => response(res, err));
});

route.post('/column-edit/:columnId', (req, res) => {
  Board.editColumn(req.params.columnId, req.body.name, req.user._id)
    .then(data => response(res, false, data))
    .catch(err => response(res, err));
});

route.post('/task-edit/:taskId', (req, res) => {
  Board.editTask(req.params.taskId, req.body.name, req.body.description, req.user._id)
    .then(data => response(res, false, data))
    .catch(err => response(res, err));
});

route.post('/board-edit', (req, res) => {
  Board.editBoard(req.user._id, req.body.name)
    .then(data => response(res, false, data))
    .catch(err => response(res, err));
});

route.post('/delete-task/:columnId/:taskId', (req, res) => {
  Board.deleteTask(req.params.columnId, req.params.taskId, req.user._id)
    .then(data => response(res, false, data))
    .catch(err => response(res, err));
});

route.post('/delete-column/:columnId', (req, res) => {
  Board.deleteColumn(req.params.columnId, req.user._id)
    .then(data => response(res, false, data))
    .catch(err => response(res, err));
});

route.post('/move/:taskId', (req, res) => {
  Board.moveTask(req.params.taskId, req.body.columnFrom, req.body.columnTo, req.user._id)
    .then(data => response(res, false, data))
    .catch(err => response(res, err));
});

module.exports = route;
