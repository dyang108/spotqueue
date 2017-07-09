var { User, Radio } = require('./models')
// connection to spotify
var spotApi = require('./spotify')
var { app } = require('./socket')
// standard dependencies
var Promise = require('bluebird')
var _ = require('lodash')
var startRadio = require('./radioStart')

// ALWAYS use userID, not objectID
app.route('/user/:userID')
  .get((req, res, next) => {
    User.findOne({ userID: req.params.userID }, (err, item) => {
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
    newUser.save((err, userObj) => {
      if (err) {
        res.sendStatus(500)
      }
      res.json(userObj)
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
    spotApi.getTrack(req.body.songs[0])
      .then((trackRes) => {
        let radioJson = req.body
        radioJson.currentSong = _.pick(trackRes.body, ['id', 'name', 'popularity', 'artist', 'album', 'album', 'duration_ms'])
        return Promise.resolve(radioJson)
      }).then((radioJson) => {
        let newRadio = new Radio(radioJson)
        newRadio.save((err, savedRadio) => {
          if (err) {
            res.sendStatus(500)
          }
          res.json(savedRadio)
          startRadio(newRadio)
        })
      })
  })
  .get((req, res, next) => {
    Radio.find({}, (err, items) => {
      if (err) {
        res.sendStatus(500)
      }
      res.json(items)
    })
  })
  .delete((req, res, next) => {
    // TODO: this.
    // Radio.
  })
