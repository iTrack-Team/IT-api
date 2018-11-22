const route = require('express').Router();
const Board = require('../api/controllers/board');
const response = require('./response');

route.post('/create', (req, res) => {
  Board.create({
    cloumns: [],
    name: req.body.name,
  })
    .then(data => response(res, false, data))
    .catch(err => response(res, err));
});

route.get('/info/:id', (req, res) => {
  Board.getInfo(req.params.id)
    .then(data => response(res, false, data))
    .catch(err => response(res, err));
});

module.exports = route;
