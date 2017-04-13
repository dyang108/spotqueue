import React, { Component } from 'react'
import {
  View,
  AsyncStorage
} from 'react-native'
import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk'
import store from 'src/store'

export default class Login extends Component {
  createNewUser (userID) {
    return fetch('http://localhost:8000/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: userID
      })
    })
    .then((res) => {
      return res.json()
    })
  }

  render () {
    return (
      <View>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log('Login Error: ' + result.error)
              } else if (result.isCancelled) {
                console.log('Login cancelled.')
              } else {
                var userID
                store.dispatch({
                  type: 'LOGIN_LOADING'
                })
                AccessToken.getCurrentAccessToken()
                  .then((data) => {
                    // just for fun, to know that you can get the accessToken
                    console.log('Access Token:', data.accessToken.toString())

                    // check if the user exists
                    userID = data.userID
                    return fetch('http://localhost:8000/user/' + userID)
                  })
                  .then((res) => {
                    return res.json()
                  })
                  .then((resJson) => {
                    // make sure that this promise returns a
                    // identical object in both case -- basic JavaScript
                    // practices, man.
                    if (resJson === null) {
                      // if the user doesn't exist, then create it
                      return this.createNewUser(userID)
                    } else {
                      // if the user does exist, continue
                      return Promise.resolve(resJson)
                    }
                  })
                  .then((user) => {
                    try {
                      AsyncStorage.setItem('@AsyncStore:USERID', userID)
                    } catch (err) {
                      console.log(err)
                    }
                    store.dispatch({
                      type: 'LOGGED_IN',
                      user: user
                    })
                  })
                  .catch((err) => {
                    console.error(err)
                  })
              }
            }
          }
          onLogoutFinished={() => console.log('logout')} />
      </View>
    )
  }
}
