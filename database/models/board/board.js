const mongoose = require('mongoose').Schema;

const { Schema } = mongoose;

const boardSchema = new Schema({
  columns: [{
    data: {
      type: Schema.Types.ObjectId,
      ref: 'Column',
      index: true,
      required: true,
    },
  }],
  name: { type: String, required: true },
});

const Board = mongoose.model('Board', boardSchema);
module.exports = { Board };
