import React, { Component } from 'react'
import {
  Text,
  View,
  ListView,
  TextInput,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import styles from 'src/config/styles'
import IconButton from 'src/components/IconButton'
import { searchForSongs } from 'src/assets/helpers'

class SearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchQuery: '',
      results: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      nowPlaying: this.props.nowPlaying
    }
    this.songSet = new Set()
  }

  updateField (text) {
    this.setState({
      searchQuery: text
    })
  }

  componentWillReceiveProps (props) {
    this.setState({
      nowPlaying: props.nowPlaying
    })
  }

  queueSong (songId) {
    fetch(process.env.API_URL + '/queue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        radioId: this.state.nowPlaying,
        songId
      })
    }).then((res) => {
      if (res.status !== 200) {
        console.log('Not queued properly')
      }
    })
  }

  render () {
    return (
      <View style={{paddingTop: 10, paddingLeft: 20, paddingRight: 20, paddingBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          <TextInput value={this.state.searchQuery} onChangeText={this.updateField.bind(this)} style={styles.inputLine} />
          <IconButton icon='search' disabled={!this.props.spotifyLoggedIn} onPress={searchForSongs.bind(this)} />
        </View>
        <ListView style={{marginTop: 10, paddingTop: 10, height: 600}} enableEmptySections dataSource={this.state.results} renderRow={(rowData, sectionID) => {
          return (
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.albumArt} source={{uri: rowData.albumArt}} />
              <View style={[styles.searchResult, styles.center, {flexDirection: 'row'}]}>
                <View style={{flex: 4}}>
                  <Text numberOfLines={1} style={styles.bold}>{rowData.name}</Text>
                  <Text numberOfLines={1} style={styles.gray}>{rowData.artist}</Text>
                  <Text numberOfLines={1} style={styles.gray}>{rowData.album}</Text>
                </View>
                <View style={{flex: 1}}><IconButton style={{alignSelf: 'flex-end', borderWidth: 0, backgroundColor: 'transparent'}} icon='level-down' onPress={() => {
                  this.queueSong(rowData.id)
                }} /></View>
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
    spotifyLoggedIn: store.spotifyStatus,
    nowPlaying: store.nowPlaying
  }
}

export default connect(mapStateToProps)(SearchPage)
