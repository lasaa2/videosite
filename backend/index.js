/* TODO

- schemat erillisiin moduuleihin ja tuodaan ne oliona requirella

*/

/* MODULES */

const mongoose = require('./models/db') // mongodb connection
const Message = require('./models/message') // Tuodaan mongodb schemat, joilla määritellään miten tietoa tallennetaan tietokantaan
// const Conversation = require('./models/conversation')
// const Video = require('./models/video') // DB conf

const express = require('express') // yleinen node web ohjelma
const app = express() // luodaan uusi web palvelin expressin avulla

const bodyParser = require('body-parser') // tarvitaan viestien tallennukseen, post palautusten käsittelyyn
const cors = require('cors') // tarvitaan jotta front ja backend voi olla eri portissa

const logger = (request, response, next) => { // logger tekee jotain restin kanssa?
  console.log('Method:',request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(logger) // asetetaan app olio käyttämään juuri määriteltyä logger funktiota
app.use(cors()) // asetetaan app olio käyttämään cors:ia
app.use(bodyParser.json()) // asetetaan app olio käyttämään bodyparseria


/* SIIVOUS FUNKTIOT, voisiko nämä yhdistää? */

const formatMessage = (message) => { // funktio joka "siivoaa" tietokantaan tallennettavaa viestiä
  return {
    user: message.user,
    content: message.content,
    date: message.date,
    id: message._id
  }
}

const formatVideo = (video) => { // funktio joka "siivoaa" tietokantaan tallennettavaa videomääritystä
  return {
    name: video.name,
    url: video.url,
    id: video._id
  }
}

/* GETTERIT */

app.get('/api/messages', (request, response) => {
  Message
    .find({})
    .then(messages => {
      response.json(messages.map(formatMessage))
      console.log(messages)
    })
})

app.get('/api/messages/:id', (request, response) => {
  Message
    .findById(request.params.id)
    .then(message => {
      if (message) {
        response.json(formatMessage(message))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.get('/api/videos', (request, response) => {
  Video
    .find({})
    .then(videos => {
      response.json(videos.map(formatVideo))
    })
})

/* Videorajapinta */

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

/* UPDATET */

app.put('/api/messages/:id', (request, response) => {
  const body = request.body

  const message = {
    content: body.content,
    important: body.important
  }

  Message
    .findByIdAndUpdate(request.params.id, message, { new: true } )
    .then(updatedMessage => {
      response.json(formatMessage(updatedMessage))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

/* DELETET */

app.delete('/api/messages/:id', (request, response) => {
  Message
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(400).send({ error: 'malformatted id' })
    })
})

/* VIRHEET */

const error = (request, response) => { // in case of error
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(error) // määritellään app olio käyttämään error funktiota

const PORT = 3002 // Listen, portti jota backend kuuntelee

const server = app.listen(PORT, () => { // määritellään server muuttuja app kuuntelifunktioksi
  console.log(`Server running on port ${PORT}`) // tulostetaan konsoliin mistä portista backend löytyy
})

/* SOCKET IO */

const io = require('socket.io')(server); // tuodaan socket io, io funktio

io.on('connection', function(socket) { // määritellään io:n on metodia käyttäen mitä tapahtuu kun käyttäjä avaa sivun ja socket lähtee rullaamaan
    console.log('User: ', socket.id, ' connected.') // tulostetaan konsoliin clientin id

    socket.on('new message', function(data) { // LISTEN for a new message

        const message = new Message({ // CREATE new message for DB
          user: data.user,
          content: data.message,
          date: new Date()
        })
      
        message
          .save()
          .then(savedMessage => {
            console.log('\n Viesti: \n', savedMessage, 'tallennettu tietokantaan.\n')
            io.emit('message', savedMessage)
            //response.json(formatMessage(savedMessage))
          })
    });

    socket.on('disconnect', function(){
      console.log('User ', socket.id, ' disconnected');
    });
});














/*


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
*/