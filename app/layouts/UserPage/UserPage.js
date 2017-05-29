import React, { Component } from 'react'
import {
  Navigator
} from 'react-native'
// import { connect } from 'react-redux'
import ProfilePage from './ProfilePage'
import SettingsPage from './SettingsPage'
import styles from 'src/config/styles'
import NavBar from 'src/components/NavBar'

class UserPage extends Component {
  render () {
    const NavigationBarRouteMapper = NavBar

    return (
      <Navigator
        initialRoute={{ title: 'Profile', index: 0 }}
        renderScene={(route, navigator) => {
          return this.renderScene(route, navigator)
        }}
        navigationBar={
          <Navigator.NavigationBar routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />}
        sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight + 20}}
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
