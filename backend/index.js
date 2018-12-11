/* TODO

- schemat erillisiin moduuleihin ja tuodaan ne oliona requirella
- mongoose yhteyspalikka esim tähän tiedostoon 

*/

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

/* MODULES */

const mongoose = require('./models/db') // mongodb connection
const Message = require('./models/message') // Tuodaan mongodb schemat, joilla määritellään miten tietoa tallennetaan tietokantaan

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

/* FRONT tarjotaan backendistä */ 

app.use(express.static('dist'))

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

/* DEMODATA */

let videos = [
  {
    "id": "0",
    "name": "Live-sample",
    "url": "http://wowza.oubs.fi/vod/mp4:sample.mp4/playlist.m3u8"
  },
  {
    "id": "1",
    "name": "Live",
    "url": "http://wowza.oubs.fi/live/oubs/playlist.m3u8"
  },
  {
    "id": "2",
    "name": "Sample 1",
    "url": "http://vjs.zencdn.net/v/oceans.mp4"
  }
]


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


/* Video getteri, haku tietokannasta */
/*
app.get('/api/videos', (request, response) => {
  Video
    .find({})
    .then(videos => {
      response.json(videos.map(formatVideo))
    })
})

*/

/* Videorajapinta */

  // Return all videos
  app.get('/api/videos', (request, response) => {
    response.json(videos)
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