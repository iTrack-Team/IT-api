const mongoose = require('mongoose').Schema;

const { Schema } = mongoose;

const columnSchema = new Schema({
  tasks: [{
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
