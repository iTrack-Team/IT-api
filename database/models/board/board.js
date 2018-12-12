const mongoose = require('mongoose');

const { Schema } = mongoose;

const boardSchema = new Schema({
  columns: [{
    type: Schema.Types.ObjectId,
    ref: 'Column',
    index: true,
    required: true,
  }],
  name: { type: String, required: true },
});

const Board = mongoose.model('Board', boardSchema);
module.exports = { Board };
