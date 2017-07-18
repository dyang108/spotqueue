import React, { Component } from 'react'
import {
  Text,
  TextInput,
  ListView,
  View,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import WideButton from 'src/components/WideButton'
import IconButton from 'src/components/IconButton'
import styles from 'src/config/styles'
import store from 'src/store'
import { searchForSongs } from 'src/assets/helpers.js'

class AddSongs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchQuery: '',
      results: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }
    this.songSet = new Set()
  }

  updateField (text) {
    this.setState({
      searchQuery: text
    })
  }

  addSong (songId) {
    if (!this.songSet.has(songId)) {
      this.songSet.add(songId)
      store.dispatch({
        type: 'ADD_SONG_TO_PLAYLIST',
        song: songId
      })
    }
  }

  saveStation () {
    fetch(process.env.API_URL + '/radio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props.newPlaylist)
    }).then((res) => {
      return res.json()
    }).then((resJson) => {
      store.dispatch({
        type: 'PLAYLIST_SAVED_TO_SERVER',
        playlist: resJson
      })
      this.props.navigator.popToTop()
    })
  }

  render () {
    return (
      <View style={{paddingTop: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 10}}>
        <WideButton style={{height: 40}} title='Done' onPress={this.saveStation.bind(this)} />
        <Text style={[styles.bold, {marginTop: 10}]}>Add songs to "{this.props.newPlaylist.title}"</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput value={this.state.searchQuery} onChangeText={this.updateField.bind(this)} style={styles.inputLine} />
          <IconButton icon='search' disabled={!this.props.spotifyLoggedIn} onPress={searchForSongs.bind(this)} />
        </View>
        <ListView style={{marginTop: 10, paddingTop: 10, height: 400}} enableEmptySections dataSource={this.state.results} renderRow={(rowData, sectionID) => {
          return (
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.albumArt} source={{uri: rowData.albumArt}} />
              <View style={[styles.searchResult, styles.center, {flexDirection: 'row'}]}>
                <View style={{flex: 4}}>
                  <Text numberOfLines={1} style={styles.bold}>{rowData.name}</Text>
                  <Text numberOfLines={1} style={styles.gray}>{rowData.artist}</Text>
                  <Text numberOfLines={1} style={styles.gray}>{rowData.album}</Text>
                </View>
                <View style={{flex: 1}}><IconButton style={{alignSelf: 'flex-end', borderWidth: 0, backgroundColor: 'transparent'}} icon='plus' onPress={() => {
                  rowData.hasAdded = true
                  this.addSong(rowData.id)
                }} disabled={rowData.hasAdded} /></View>
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
