import React, { Component } from 'react'
import {
  View,
  AsyncStorage,
  NativeModules
} from 'react-native'
import { connect } from 'react-redux'
import MainView from './MainView'
import store from './store'
import ws from 'src/config/socket'

const USERID = '@AsyncStore:USERID'
var SpotifyAuth = NativeModules.SpotifyAuth

class MainWrapperClass extends Component {
  componentDidMount () {
    this.findUser()
  }

  findUser () {
    // For mistakes when I removed the database instance first
    // AsyncStorage.removeItem(USERID)
    SpotifyAuth.loggedIn(res => {
      if (res === true) {
        store.dispatch({
          type: 'SPOTIFY_LOGIN'
        })
      } else {
        store.dispatch({
          type: 'SPOTIFY_LOGOUT'
        })
      }
    })
    this._loadInitialState()
      .then((userID) => {
        if (userID !== null) {
          fetch(process.env.API_URL + '/user/' + userID)
            .then((res) => {
              return res.json()
            })
            .then((user) => {
              store.dispatch({
                type: 'LOGGED_IN',
                user: user
              })
              ws.send(JSON.stringify({
                userID,
                type: 'USERID'
              }))
            })
        } else {
          store.dispatch({
            type: 'LOGGED_OUT'
          })
        }
      })
  }

  async _loadInitialState () {
    try {
      return await AsyncStorage.getItem(USERID)
    } catch (error) {
      console.log('Error getting userID: ' + error)
      return null
    }
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <MainView loginStatus={this.props.loginStatus} />
      </View>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    loginStatus: store.loginStatus
  }
}

export default connect(mapStateToProps)(MainWrapperClass)
