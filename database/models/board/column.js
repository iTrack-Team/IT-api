const mongoose = require('mongoose');

const { Schema } = mongoose;

const columnSchema = new Schema({
  tasks: [{
    _id: false,
    data: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      ref: 'Task',
    },
  }],
  name: { type: String, required: true },
});

const Column = mongoose.model('Column', columnSchema);
module.exports = { Column };
