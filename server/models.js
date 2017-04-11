var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SongId = String // TODO: change this with actual format of song id

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

var User = mongoose.model('User', {
  username: String,
  firstName: String,
  lastName: String,
  bio: String,
  friends: [Schema.Types.ObjectId],
  currentRadio: Schema.Types.ObjectId
})

var Radio = mongoose.model('Radio', {
  title: String,
  currentSong: SongId,
  includes: [SongId],
  upNext: [SongId],
})

module.exports = {
  User,
  Radio
}