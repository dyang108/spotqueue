import React, { Component } from 'react'
import {
  Navigator
} from 'react-native'
// import { connect } from 'react-redux'
import ProfilePage from './ProfilePage'
import SettingsPage from './SettingsPage'

class UserPage extends Component {
  render () {
    return (
      <Navigator
        initialRoute={{ title: 'Profile', index: 0 }}
        renderScene={(route, navigator) => {
          return this.renderScene(route, navigator)
        }}
      />
    )
  }

  renderScene (route, navigator) {
    switch (route.title) {
      case 'Profile':
        return <ProfilePage navigator={navigator} />
      case 'Settings':
        return <SettingsPage navigator={navigator} />
    }
  }
}

export default UserPage
