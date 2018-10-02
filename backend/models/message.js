const mongoose = require('mongoose')

const url = 'mongodb://fullstack:sekred@ds211088.mlab.com:11088/fullstack-notes'

mongoose.connect(url)

const Message = mongoose.model('Message', {
  content: String,
  date: Date,
  important: Boolean
})

module.exports = Message