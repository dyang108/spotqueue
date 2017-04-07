var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Promise = require('bluebird');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;

// Connection URL
var url = 'mongodb://localhost:27017/spotqueue';
var db, users, radios;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/*
Schemas
  User schema: 
    _id: ObjectId
    username: String
    firstName: String
    lastName: String
    friends: [ObjectId]
    currentRadio: ObjectId <-- foreign key to Radio
  Radio schema:
    _id: ObjectId
    title: String
    currentSong: SongId <-- foreign key to Spotify song
    includes: [SongIds]
    upNext: [SongIds]
*/

// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  users = db.collection('users')
  radios = db.collection('radios')
  app.listen(8000, function () {
    console.log('App running on port 8000');
  })
});

// this line used for the socket.io connection
// server.listen(80);

app.route('/user/:id')
  .get(function (req, res, next) {
    users.findOne({ _id: new ObjectId(req.params.id) }, function (err, item) {
      res.send(item)
    })
  })
  .post(function (req, res, next) {
    var updateObj = { $set: req.body }
    users.update({ _id: new ObjectId(req.params.id) }, updateObj, function (err, result) {
      res.send(200)
    })
  })

app.route('/user')
  .post(function (req, res, next) {
    users.insert(req.body, function (err, item) {
      res.sendStatus(200)
    })
  })

app.route('/radio/:id')
  .get(function (req, res, next) {
    radios.findOne({ _id: new ObjectId(req.params.id) }, function (err, item) {
      res.send(item)
    })
  })
  .post(function (req, res, next) {
    var updateObj = { $set: req.body }
    radios.update({ _id: new ObjectId(req.params.id) }, updateObj, function (err, result) {
      res.send(200)
    })
  })

app.route('/radio')
  .post(function (req, res, next) {
    radios.insert(req.body, function (err, item) {
      res.sendStatus(200)
    })
  })

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
