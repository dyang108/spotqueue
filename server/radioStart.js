var spotApi = require('./spotify')
var CronJob = require('cron').CronJob
var { pickTrackProps } = require('./helpers')
var { server } = require('./config')
const WebSocket = require('ws')
var clients = {}

const socket = new WebSocket.Server({server})
socket.on('connection', function connection (ws) {
  ws.on('message', function incoming (message) {
    let msgobj = JSON.parse(message)
    if (msgobj.type === 'USERID') {
      clients[msgobj.userID] = ws
    }
    console.log(clients)
    console.log('received: %s', message)
  })
})

function getRandInd (count) {
  return Math.floor(Math.random() * count)
}

function nextSong (radio) {
  var goToNext = function () {
    let nextSong = ''
    if (radio.upNext.length !== 0) {
      nextSong = radio.upNext.shift()
    } else {
      nextSong = radio.songs[getRandInd(radio.songs.length)]
    }
    // TODO: cache tracks instead of querying API every time
    // Also: get all tracks at once?
    spotApi.getTrack(nextSong)
      .then((trackRes) => {
        radio.currentSongStarted = new Date()
        radio.currentSong = pickTrackProps(trackRes)
        radio.save((err, savedRadio) => {
          if (err) {
            console.error(err)
          }
          savedRadio.listening.forEach((userId) => {
            clients[userId].send(JSON.stringify(savedRadio.currentSong))
          })
          // TODO: send socket message
          // socket.send(radio, {}, (thing) => {
          //   console.log('hi', thing)
          // })
          // schedule the next song
          startRadio(radio)
        })
      })
  }
  return goToNext
}

function startRadio (radio) {
  let dateObj = Date.now()
  dateObj += radio.currentSong.duration_ms
  let cronTime = new Date(dateObj)
  let job = new CronJob({
    cronTime,
    onTick: nextSong(radio),
    start: false,
    timeZone: 'America/New_York'
  })
  job.start()
}

module.exports = startRadio
