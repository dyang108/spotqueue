// Set up server and socket
var app = require('express')()
var bodyParser = require('body-parser')
const WebSocket = require('ws')
var server = require('http').createServer(app)
// DB imports
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const port = 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const wss = new WebSocket.Server({server})
wss.on('connection', function connection (ws) {
  ws.on('message', function incoming (message) {
    console.log('received: %s', message)
  })
  ws.send('something')
})

// connect to the database
var url = 'mongodb://localhost:27017/spotqueue'
mongoose.connect(url)
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  server.listen(port, () => {
    console.log('App running on port ' + port)
  })
})

module.exports = {
  // db,
  app
}
