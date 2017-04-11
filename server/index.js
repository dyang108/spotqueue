var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var Promise = require('bluebird')
var bodyParser = require('body-parser')
var ObjectId = require('mongodb').ObjectID
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
var models = require('./models')
var url = 'mongodb://localhost:27017/spotqueue'
mongoose.connect(url)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen(8000, () => {
    console.log('App running on port 8000')
  })
});
// Connection URL
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/*Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
  assert.equal(null, err)
  console.log("Connected successfully to server")
  users = db.collection('users')
  radios = db.collection('radios')
  app.listen(8000, function () {
    console.log('App running on port 8000')
  })
})*/

// this line used for the socket.io connection
// server.listen(80)

app.route('/user/:id')
  .get((req, res, next) => {
    models.User.findById(req.params.id, (err, item) => {
      res.json(item)
    })
  })
  .post((req, res, next) => {
    models.User
      .findByIdAndUpdate(req.params.id, req.body, (err, userObj) => {
        if (err) {
          res.sendStatus(500)
        }
        res.sendStatus(userObj)
      })
  })

app.route('/user')
  .post((req, res, next) => {
    var newUser = new models.User(req.body)
    newUser.save((err, res) => {
      res.sendStatus(200)
    })
  })

app.route('/radio/:id')
  .get((req, res, next) => {
    models.Radio.findOne({
      _id: req.params.id
    },  (err, item) => {
      res.json(item)
    })
  })
  .post((req, res, next) => {
    models.Radio
      .findByIdAndUpdate(req.params.id, req.body, (err, result) => {
        if (err) {
          res.sendStatus(500)
        }
        res.sendStatus(200)
      })
  })

app.route('/radio')
  .post((req, res, next) => {
    var newRadio = new models.Radio(req.body)
    newRadio.save((err, res) => {
      res.sendStatus(200)
    })
  })

io.on('connection',  (socket) => {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', (data) => {
    console.log(data)
  })
})
