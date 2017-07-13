import React, { Component } from 'react'
import {
  ScrollView,
  View,
  ListView,
  Text,
  Image,
  NativeModules
} from 'react-native'
import { connect } from 'react-redux'
import WideButton from 'src/components/WideButton'
import styles from 'src/config/styles'
import IconButton from 'src/components/IconButton'
import store from 'src/store'
import _ from 'lodash'
import ws from 'src/config/socket'
import { getTimeElapsed } from 'src/assets/helpers'

var SpotifyModule = NativeModules.SpotifyAuth
ws.onmessage = (msg) => {
  console.log(msg, msg.data)
  let song = JSON.parse(msg.data)
  // TODO: handle the new song
  SpotifyModule.playURI('spotify:track:' + song.id, (err) => {
    console.log('Playing', res.currentSong.name)
    if (err) {
      console.log(err)
    } else {
      store.dispatch({
        type: 'RADIO_ON',
        radioId: stationId
      })
    }
  })
}

class StationMain extends Component {
  static propTypes = {
    navigator: React.PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      playlists: (new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2 })).cloneWithRows(this.props.playlists)
    }
    this.getPlaylists()
  }

  componentWillReceiveProps (props) {
    this.state = {
      playlists: this.state.playlists.cloneWithRows(props.playlists)
    }
  }

  getPlaylists() {
    fetch(process.env.API_URL + '/radio', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return res.json()
    }).then((res) => {
      this.setState({
        playlists: this.state.playlists.cloneWithRows(res)
      })
      store.dispatch({
        type: 'GOT_ALL_PLAYLISTS',
        playlists: res
      })
    })
  }

  goBack () {
    this.state.navigator.pop()
  }

  playStation (stationId) {
    fetch(process.env.API_URL + '/radio/' + stationId + '/' + this.props.user.userID, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return res.json()
    }).then((res) => {
      // calculate start time for song
      let startTime = getTimeElapsed(res.currentSongStarted)
      SpotifyModule.playURIs(['spotify:track:' + res.currentSong.id], {trackIndex :0, startTime }, (err) => {
        console.log('Playing', res.currentSong.name)
        if (err) {
          console.log(err)
        } else {
          store.dispatch({
            type: 'RADIO_ON',
            radioId: stationId
          })
        }
      })
    })
  }

  stopPlaying () {
    // TODO: send a message to server to say that were not listening
    SpotifyModule.setIsPlaying(false, (err) => {
      if (err) {
        console.log(err)
      } else {
        store.dispatch({
          type: 'RADIO_OFF'
        })
      }
    })
  }

  getAlbumArt (rowData) {
    let url = _.get(rowData, ['currentSong', 'album', 'images', 0, 'url'])
    if (url) {
      return url
    } else {
      return 'src/assets/unknown-album.png'
    }
  }

  render () {
    const { navigator } = this.props
    var renderListElem = (rowData) => {
      let icon = this.props.nowPlaying === rowData._id ? 'stop' : 'play'
      return (
        <View style={{flexDirection: 'row'}}>
        <Image style={styles.albumArt} source={{uri: this.getAlbumArt(rowData)}} />
        <View style={[styles.searchResult, styles.centerSecondary, {flexDirection: 'row'}]}>
          <View style={{flex: 4}}>
            <Text numberOfLines={1} style={styles.bold}>{rowData.title}</Text>
          </View>
          <View style={{flex: 1}}><IconButton style={{alignSelf: 'flex-end', borderWidth: 0, backgroundColor: 'transparent'}} icon={icon} onPress={() => {
            if (this.props.nowPlaying !== rowData._id) {
              this.playStation(rowData._id)
            } else {
              this.stopPlaying()
            }
          }} /></View>
        </View>
      </View>
      )
    }

    return (
      <View navigator={ navigator } style={ styles.profileView }>
        <WideButton onPress={
            function () {
              navigator.push({ title: 'Name Your Station', index: 1})
            }
          } title='Create Station'></WideButton>
          <ListView dataSource={this.state.playlists} style={{marginTop: 15}} renderRow={renderListElem}>
          </ListView>
      </View>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    playlists: store.playlists,
    nowPlaying: store.nowPlaying,
    user: store.user
  }
}

export default connect(mapStateToProps)(StationMain)
