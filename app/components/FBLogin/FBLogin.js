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
import GraphPromise from 'src/config/graph'
import Promise from 'bluebird'

export default class Login extends Component {
  createNewUser (userID, accessToken) {
    return Promise.props({
      graph: GraphPromise('/me', accessToken, {
        fields: {
          string: 'gender,first_name,last_name'
        }
      }),
      photo: GraphPromise('/me/?fields=picture.type(large)', accessToken)
    })
    .then((res) => {
      console.log(res)
      if (res.graph.error || res.photo.error) {
        return { error: true }
      } else {
        return fetch(process.env.API_URL + '/user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userID: userID,
            firstName: res.graph.first_name,
            lastName: res.graph.last_name,
            photoUrl: res.photo.picture.data.url,
            gender: res.graph.gender
          })
        }).then((res) => res.json())
      }
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
                var userID, accessToken
                store.dispatch({
                  type: 'LOGIN_LOADING'
                })
                AccessToken.getCurrentAccessToken()
                  .then((data) => {
                    accessToken = data.accessToken.toString()

                    // check if the user exists
                    userID = data.userID
                    return fetch(process.env.API_URL + '/user/' + userID)
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
                      return this.createNewUser(userID, accessToken)
                    } else {
                      // if the user does exist, continue
                      return Promise.resolve(resJson)
                    }
                  })
                  .then((user) => {
                    if (user.error) {
                      throw new Error({msg: 'Creating new user went wrong.'})
                    }
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
