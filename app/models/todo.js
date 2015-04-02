var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  name: String,
  done: Boolean,
  note: String,
  updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('todo', TodoSchema);
