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
  // should be identical to the Facebook userID from the SDK
  userID: { type: String, unique: true },
  bio: String,
  friends: [String],
  currentRadio: Schema.Types.ObjectId
})

var Radio = mongoose.model('Radio', {
  title: String,
  currentSong: SongId,
  includes: [SongId],
  upNext: [SongId]
})

module.exports = {
  User,
  Radio
}
