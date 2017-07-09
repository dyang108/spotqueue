var spotApi = require('./spotify')
var CronJob = require('cron').CronJob
var { pickTrackProps } = require('./helpers')

function getRandInd (count) {
  return Math.floor(Math.random() * count)
}

function nextSong (radio) {
  var goToNext = function () {
    console.log('in function', radio)
    let nextSong = ''
    if (radio.upNext.length !== 0) {
      nextSong = radio.upNext.shift()
    } else {
      nextSong = radio.songs[getRandInd(radio.songs.length)]
    }
    spotApi.getTrack(nextSong)
      .then((trackRes) => {
        radio.currentSongStarted = new Date()
        radio.currentSong = pickTrackProps(trackRes)
        radio.save((err, savedRadio) => {
          if (err) {
            console.error(err)
          }
          console.log('success!', savedRadio)
          // TODO: send socket message
          // schedule the next song
          startRadio(savedRadio)
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
