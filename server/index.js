var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var bodyParser = require('body-parser')

// DB imports
var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
var { User, Radio } = require('./models')

// connect to the database
var url = 'mongodb://localhost:27017/spotqueue'
mongoose.connect(url)
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  app.listen(8000, () => {
    console.log('App running on port 8000')
  })
})

// Connection URL
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// this line used for the socket.io connection
// server.listen(80)

// ALWAYS use username, not objectID
app.route('/user/:username')
  .get((req, res, next) => {
    User.findOne({ username: req.params.username }, (err, item) => {
      if (err) {
        res.sendStatus(500)
      }
      res.json(item)
    })
  })
  .post((req, res, next) => {
    User
      .findOneAndUpdate({ username: req.params.username }, req.body, {new: true}, (err, userObj) => {
        if (err) {
          res.sendStatus(500)
        }
        res.json(userObj)
      })
  })

app.route('/user')
  .post((req, res, next) => {
    var newUser = new User(req.body)
    newUser.save((err, res) => {
      if (err) {
        res.sendStatus(500)
      }
      res.sendStatus(200)
    })
  })

app.route('/radio/:id')
  .get((req, res, next) => {
    Radio.findOne({
      _id: req.params.id
    }, (err, item) => {
      if (err) {
        res.sendStatus(500)
      }
      res.json(item)
    })
  })
  .post((req, res, next) => {
    Radio
      .findByIdAndUpdate(req.params.id, req.body, (err, result) => {
        if (err) {
          res.sendStatus(500)
        }
        res.sendStatus(200)
      })
  })

app.route('/radio')
  .post((req, res, next) => {
    var newRadio = new Radio(req.body)
    newRadio.save((err, res) => {
      if (err) {
        res.sendStatus(500)
      }
      res.sendStatus(200)
    })
  })

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', (data) => {
    console.log(data)
  })
})
