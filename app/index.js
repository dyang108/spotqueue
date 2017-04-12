import React, { Component } from 'react'
import {
  View,
  StatusBar,
  AsyncStorage
} from 'react-native'
import {
  Provider
} from 'react-redux'
import store from './store'
import MainView from './MainView'

const USERNAME = '@AsyncStore:username'

class spotqueueRN extends Component {
  constructor () {
    super()
    this.state = {
      loginStatus: 'load'
    }
  }

  componentDidMount () {
    this.findUser()
    this.unsubscribe = store.subscribe(() => {
      this.findUser()
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  findUser () {
    this._loadInitialState()
      .then((user) => {
        if (user !== null) {
          this.setState({
            loginStatus: 'in',
            user: user
          })
        } else {
          this.setState({loginStatus: 'out'})
        }
      })
  }

  async _loadInitialState () {
    try {
      return await AsyncStorage.getItem(USERNAME)
    } catch (error) {
      console.log('error happened')
      return null
    }
  }

  render () {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar />
          <MainView loginStatus={this.state.loginStatus} />
        </View>
      </Provider>
    )
  }
}

export default spotqueueRN
