const Message = require('./models/message') // DB conf

const express = require('express') // yleinen node web ohjelma
const app = express() // luodaan uusi web palvelin expressin avulla

const bodyParser = require('body-parser') // tarvitaan viestien tallennukseen, post palautusten käsittelyyn
const cors = require('cors') // tarvitaan jotta front ja backend voi olla eri portissa

//const Message = require('./models/message')

const logger = (request, response, next) => {
  console.log('Method:',request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(logger)
app.use(cors()) // asetetaan app olio käyttämään cors:ia
app.use(bodyParser.json()) // asetetaan app olio käyttämään bodyparseria


const formatMessage = (message) => {
  return {
    content: message.content,
    date: message.date,
    important: message.important,
    id: message._id
  }
}

/* GETTERIT */

app.get('/api/messages', (request, response) => {
  Message
    .find({})
    .then(messages => {
      response.json(messages.map(formatMessage))
    })
})

app.get('/api/notes/:id', (request, response) => {
  Note
    .findById(request.params.id)
    .then(note => {
      response.json(formatNote(note))
    })
})

/* POSTERIT / SETTERIT */

app.post('/api/messages', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  const message = new Message({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  message
    .save()
    .then(savedMessage => {
      response.json(formatMessage(savedMessage))
    })
})


/*
let videos = [
  {
    "id": "0",
    "name": "Live",
    "url": "http://wowza.oubs.fi/vod/mp4:sample.mp4/playlist.m3u8"
  },
  {
    "id": "1",
    "name": "Sample 1",
    "url": "http://vjs.zencdn.net/v/oceans.mp4"
  },
  {
    "id": "2",
    "name": "Sample 2",
    "url": "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4"
  }
]

let messages = [
  {
    id: 1,
    content: 'HTML on helppoa',
    date: '2017-12-10T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Selain pystyy suorittamaan vain javascriptiä',
    date: '2017-12-10T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    date: '2017-12-10T19:20:14.298Z',
    important: true
  }
]
*/

  
/*
  app.get('/', (req, res) => {
    res.send('<a href="api">API</a>')
  })

  app.get('/api', (req, res) => {
    res.send('<h1>Rajapinta videoille ja viesteille</h1><p>Käyttö: <li>videot: <a href="api/videos">/api/videos</a></li><li>viestit: <a href="api/messages">/api/messages</a></li></p>')
  })

*/


  /* Videorajapinta */

/*

  // Return all videos
  app.get('/api/videos', (request, response) => {
    response.json(videos)
  })

  // Return video filtered by ID
  app.get('/videos/:id', (request, response) => {
    const id = Number(request.params.id)
    const video = videos.find(video => video.id === id)
    if (video) {
        response.json(video)
    } else {
        response.status(404).end()
    }
  })
*/
  /* Chat viestit */

/*

  // Return all messages
  app.get('/api/messages', (request, response) => {
    Message
      .find({}, {__v: 0})
      .then(messages => {
        response.json(messages.map(formatMessage))
      })
  })
  
  // Return messages filtered by id
  app.get('/api/messages/:id', (request, response) => {
    Message
      .findById(request.params.id)
      .then(message => {
        response.json(formatMessage(message))
      })
  })

  // Save message to database
  app.post('/api/messages', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({error: 'content missing'})
    }
  
    const message = new Message({
      content: body.content,
      important: body.important || false,
      date: new Date()
    })
  
    message
      .save()
      .then(savedMessage => {
        response.json(formatMessage(savedMessage))
      })
  })

  // Delete message from database
  app.delete('/api/messages/:id', (request, response) => {
    const id = Number(request.params.id)
    message = message.filter(message => message.id !== id)
  
    response.status(204).end()
  })

  const formatMessage = (message) => {
    return {
      content: message.content,
      date: message.date,
      important: message.important,
      id: message._id
    }
  }

*/
  // in case of error
  const error = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
  }
  
  app.use(error)

  // Listen
  const PORT = 3002
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })