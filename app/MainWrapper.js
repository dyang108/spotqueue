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
      .then((user) => {
        if (user !== null) {
          console.log('Async store found user')
          store.dispatch({
            type: 'LOGGED_IN',
            user: user
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
    console.log(this.props.loginStatus)
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
