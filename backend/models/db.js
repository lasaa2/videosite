const url = process.env.MONGODB_URI;

const options = {
   useNewUrlParser: true 
}

const mongoose = require('mongoose')
mongoose.connect(url, options ) // muodostetaan yhteys tietokantaan
  .then( () => { console.log("Connection succesful") }) // handle return promise
  .catch(err => console.log(err)); // handle errors

module.exports = mongoose;