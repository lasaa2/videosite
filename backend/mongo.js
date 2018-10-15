
/*
const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
// const url = 'mongodb://fullstack:sekred@ds211088.mlab.com:11088/fullstack-notes'
const url = ''

mongoose.connect(url)

const Message = mongoose.model('Message', {
  content: String,
  date: Date,
  important: Boolean
})

const message = new Message({
  content: 'HTML on helppoa',
  date: new Date(),
  important: true
})

message
  .save()
  .then(response => {
    console.log('message saved!')
    mongoose.connection.close()
  })

  */