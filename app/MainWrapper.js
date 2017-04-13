import React, { Component } from 'react'
import {
  View,
  StatusBar,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import MainView from './MainView'
import store from './store'

const USERID = '@AsyncStore:USERID'

class MainWrapperClass extends Component {
  componentDidMount () {
    this.findUser()
  }

  findUser () {
    this._loadInitialState()
      .then((userID) => {
        if (userID !== null) {
          console.log('Async store found userID')
          fetch('http://localhost:8000/user/' + userID)
            .then((res) => {
              return res.json()
            })
            .then((user) => {
              store.dispatch({
                type: 'LOGGED_IN',
                user: user
              })
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
        <StatusBar />
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
