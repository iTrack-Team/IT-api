const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserBoardRelSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, required: true, index: true, ref: 'User',
  },
  board: {
    type: Schema.Types.ObjectId, required: true, index: true, ref: 'Board',
  },
});

const UserBoardRel = mongoose.model('UserBoardRel', UserBoardRelSchema);

module.exports = { UserBoardRel };
