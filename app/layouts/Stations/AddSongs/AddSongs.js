import React, { Component } from 'react'
import {
  Text,
  TextInput,
  ListView,
  View,
  NativeModules,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import IconButton from 'src/components/IconButton'
import styles from 'src/config/styles'
import store from 'src/store'

var SpotifyModule = NativeModules.SpotifyAuth

class AddSongs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchQuery: '',
      results: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  updateField (text) {
    this.setState({
      searchQuery: text
    })
  }

  searchForSongs () {
    var defaultAlbumArt = '/assets/unknown-album.png' // probably wanna change this later
    SpotifyModule.performSearchWithQuery(this.state.searchQuery, 'track', 0, 'US', (err, res) => {
      if (err) {
        console.log(err)
      } else {
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
            // popularity: elem.popularity,
            // href: elem.href,
            artist: artists,
            album: elem.album.name,
            albumArt: (elem.album.images && elem.album.images.length !== 0) ? elem.album.images[0].url : defaultAlbumArt
          }
        })
        this.setState({
          results: this.state.results.cloneWithRows(resultList)
        })
      }
    })
  }

  addSong (songId) {
    store.dispatch({
      type: 'ADD_SONG_TO_PLAYLIST',
      songId: songId
    })
  }

  render () {
    return (
      <View style={{padding: 20}}>
        <Text style={styles.bold}>Add songs to "{this.props.newPlaylist.title}"</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput value={this.state.searchQuery} onChangeText={this.updateField.bind(this)} style={styles.inputLine} />
          <IconButton icon='search' disabled={!this.props.spotifyLoggedIn} onPress={this.searchForSongs.bind(this)} />
        </View>
        <ListView style={{marginTop: 20, paddingTop: 10}} enableEmptySections dataSource={this.state.results} renderRow={(rowData) => {
          return (
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.albumArt} source={{uri: rowData.albumArt}} />
              <View style={[styles.searchResult, styles.center, {flexDirection: 'row'}]}>
                <View style={{flex: 4}}>
                  <Text numberOfLines={1} style={styles.bold}>{rowData.name}</Text>
                  <Text style={styles.gray}>{rowData.artist}</Text>
                  <Text style={styles.gray}>{rowData.album}</Text>
                </View>
                <View style={{flex: 1}}><IconButton style={{alignSelf: 'flex-end', borderWidth: 0, backgroundColor: 'transparent'}} icon='plus' onPress={() => {
                  this.addSong(rowData.id)
                }} disabled={this.props.newPlaylist.songs.includes(rowData.id)} /></View>
              </View>
            </View>
          )
        }} />
      </View>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    newPlaylist: store.newPlaylist,
    spotifyLoggedIn: store.spotifyStatus
  }
}

export default connect(mapStateToProps)(AddSongs)
