import moment from 'moment'
import {
  NativeModules
} from 'react-native'

var SpotifyModule = NativeModules.SpotifyAuth

export function getTimeElapsed (startTime) {
  return (moment() - moment(startTime)) / 1000
}

export function searchForSongs (tryNumber = 0) {
  var defaultAlbumArt = 'src/assets/unknown-album.png' // probably wanna change this later
  SpotifyModule.performSearchWithQuery(this.state.searchQuery, 'track', 0, 'US', (err, res) => {
    if (err) {
      console.log(err)
    } else {
      if (res.length === 0 && tryNumber < 10) {
        // sometimes the search doesnt work
        this.searchForSongs(tryNumber + 1)
        return
      }
      let resultList = res.map((elem) => {
        let artists = ''
        elem.artists.forEach((artist, index) => {
          artists += artist.name
          if (index !== elem.artists.length - 1) {
            artists += ', '
          }
        })

        return {
          name: elem.name,
          id: elem.id,
          popularity: elem.popularity,
          // href: elem.href,
          artist: artists,
          album: elem.album.name,
          albumArt: (elem.album.images && elem.album.images.length !== 0) ? elem.album.images[0].url : defaultAlbumArt,
          hasAdded: false
          // whether or not it has been added to the playlist
        }
      })
      this.setState({
        results: this.state.results.cloneWithRows(resultList)
      })
    }
  })
}
