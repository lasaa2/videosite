const mongoose = require('mongoose'), Schema = mongoose.Schema;

const Message = mongoose.model('Message', {
  user: String,
  content: String,
  date: Date
})

module.exports = Message