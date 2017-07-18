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

class StationMain extends Component {
  static propTypes = {
    navigator: React.PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      playlists: (new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2 })).cloneWithRows(this.props.playlists),
      nowPlaying: this.props.nowPlaying
    }
    ws.onmessage = (msg) => {
      let song = JSON.parse(msg.data)
      SpotifyModule.playURIs(['spotify:track:' + song.id], { trackIndex :0, startTime: 0 }, (err) => {
        if (err) {
          console.log(err)
        }
      })
    }
    this.getPlaylists()
  }

  componentWillReceiveProps (props) {
    this.setState({
      playlists: this.state.playlists.cloneWithRows(props.playlists)
    })
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
    let startPlaying = () => {
      fetch(process.env.API_URL + '/radio/' + stationId + '/' + this.props.user.userId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        return res.json()
      }).then((res) => {
        // calculate start time for song
        let startTime = getTimeElapsed(res.currentSongStarted)
        SpotifyModule.playURIs(['spotify:track:' + res.currentSong.id], { trackIndex :0, startTime }, (err) => {
          if (err) {
            console.log(err)
          } else {
            store.dispatch({
              type: 'RADIO_ON',
              radioId: stationId
            })
            this.setState({
              nowPlaying: stationId
            })
          }
        })
      })
    }
    if (!!this.state.nowPlaying && stationId !== this.state.nowPlaying) {
      this.pause().then((res) => {
        if (res.status !== 200) {
          console.error('something went wrong on pause')
        }
        startPlaying()
      })
    } else {
      startPlaying()
    }
  }

  pause () {
    return fetch(process.env.API_URL + '/stop/' + this.state.nowPlaying + '/' + this.props.user.userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  stopPlaying () {
    this.pause().then((res) => {
      if (res.status !== 200) {
        console.error('something went wrong on pause')
      }
      SpotifyModule.setIsPlaying(false, (err) => {
        if (err) {
          console.log(err)
        } else {
          store.dispatch({
            type: 'RADIO_OFF'
          })
          this.setState({
            nowPlaying: null
          })
        }
      })
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
      return (
        <View style={{flexDirection: 'row'}}>
        <Image style={styles.albumArt} source={{uri: this.getAlbumArt(rowData)}} />
        <View style={[styles.searchResult, styles.centerSecondary, {flexDirection: 'row'}]}>
          <View style={{flex: 4}}>
            <Text numberOfLines={1} style={styles.bold}>{rowData.title}</Text>
          </View>
          <View style={{flex: 1}}><IconButton style={{alignSelf: 'flex-end', borderWidth: 0, backgroundColor: 'transparent'}} icon={this.state.nowPlaying === rowData._id ? 'stop' : 'play'} onPress={() => {
            if (this.state.nowPlaying !== rowData._id) {
              this.playStation(rowData._id)
            } else {
              this.stopPlaying()
            }
          }} /></View>
        </View>
      </View>
      )
    }
    if (this.props.spotifyLoggedIn) {
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
    } else {
      return (
        <View style={[styles.center, styles.container]}>
          <Text style={styles.bold}>You are not logged in to Spotify.</Text>
          <Text style={styles.bold}>Login in Settings.</Text>
        </View>
      )
    }
  }
}

const mapStateToProps = (store) => {
  return {
    playlists: store.playlists,
    nowPlaying: store.nowPlaying,
    user: store.user,
    spotifyLoggedIn: store.spotifyStatus 
  }
}

export default connect(mapStateToProps)(StationMain)
